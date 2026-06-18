import os
import sqlite3
try:
    from dotenv import load_dotenv
except ImportError:
    load_dotenv = lambda *args, **kwargs: None

try:
    import psycopg2
    from psycopg2.extras import RealDictCursor
except ImportError:
    psycopg2 = None
    RealDictCursor = None

load_dotenv()

SQLITE_FILE = os.path.join(os.path.dirname(__file__), 'attendpro.db')


class SqliteCursor(sqlite3.Cursor):
    def execute(self, sql, parameters=None):
        if parameters is None:
            return super().execute(sql)
        return super().execute(sql.replace('%s', '?'), parameters)

    def executemany(self, sql, seq_of_parameters):
        return super().executemany(sql.replace('%s', '?'), seq_of_parameters)


class SqliteConnection(sqlite3.Connection):
    def cursor(self, factory=None):
        return super().cursor(factory=SqliteCursor)


def _is_sqlite_connection(conn):
    return isinstance(conn, sqlite3.Connection)


def get_db():
    database_url = os.getenv('DATABASE_URL', '').strip()
    if database_url and psycopg2 is not None:
        try:
            conn = psycopg2.connect(database_url, connect_timeout=5)
            conn.cursor_factory = RealDictCursor
            return conn
        except Exception as exc:
            print('WARNING: Could not connect to PostgreSQL DATABASE_URL:', exc)
            print('Falling back to local SQLite database at', SQLITE_FILE)
    elif database_url and psycopg2 is None:
        print('WARNING: psycopg2 is not installed; using local SQLite database instead.')

    conn = sqlite3.connect(SQLITE_FILE, factory=SqliteConnection, check_same_thread=False)
    conn.row_factory = sqlite3.Row
    return conn

def init_db():
    conn = get_db()
    cursor = conn.cursor()

    if _is_sqlite_connection(conn):
        cursor.execute('''
            CREATE TABLE IF NOT EXISTS admin (
                id INTEGER PRIMARY KEY AUTOINCREMENT,
                email TEXT NOT NULL,
                password TEXT
            )
        ''')
        cursor.execute('''
            CREATE TABLE IF NOT EXISTS students (
                id INTEGER PRIMARY KEY AUTOINCREMENT,
                name TEXT NOT NULL,
                email TEXT,
                class TEXT
            )
        ''')
        cursor.execute('''
            CREATE TABLE IF NOT EXISTS attendance (
                id INTEGER PRIMARY KEY AUTOINCREMENT,
                student_id INTEGER NOT NULL,
                date TEXT NOT NULL,
                status TEXT NOT NULL DEFAULT 'present',
                FOREIGN KEY(student_id) REFERENCES students(id)
            )
        ''')
    else:
        cursor.execute('''
            CREATE TABLE IF NOT EXISTS admin (
                id SERIAL PRIMARY KEY,
                email TEXT NOT NULL,
                password TEXT
            )
        ''')
        cursor.execute('''
            CREATE TABLE IF NOT EXISTS students (
                id SERIAL PRIMARY KEY,
                name TEXT NOT NULL,
                email TEXT,
                class TEXT
            )
        ''')
        cursor.execute('''
            CREATE TABLE IF NOT EXISTS attendance (
                id SERIAL PRIMARY KEY,
                student_id INTEGER NOT NULL REFERENCES students(id),
                date TEXT NOT NULL,
                status TEXT NOT NULL DEFAULT 'present'
            )
        ''')

    conn.commit()
    cursor.close()
    conn.close()