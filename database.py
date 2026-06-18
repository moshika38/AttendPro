import os
import psycopg2
from psycopg2.extras import RealDictCursor

# DATABASE_URL = os.getenv('DATABASE_URL')

def get_db():
    DATABASE_URL = os.getenv('DATABASE_URL')   
    conn = psycopg2.connect(DATABASE_URL)
    conn.cursor_factory = RealDictCursor
    return conn

def init_db():
    conn = get_db()
    cursor = conn.cursor()
    cursor.execute("""
        CREATE TABLE IF NOT EXISTS admin (
            id       SERIAL PRIMARY KEY,
            email    TEXT NOT NULL,
            password TEXT
        )
    """)
    cursor.execute("""
        CREATE TABLE IF NOT EXISTS students (
            id    SERIAL PRIMARY KEY,
            name  TEXT NOT NULL,
            email TEXT,
            class TEXT
        )
    """)
    cursor.execute("""
        CREATE TABLE IF NOT EXISTS attendance (
            id         SERIAL PRIMARY KEY,
            student_id INTEGER NOT NULL REFERENCES students(id),
            date       TEXT NOT NULL,
            status     TEXT NOT NULL DEFAULT 'present'
        )
    """)
    conn.commit()
    cursor.close()
    conn.close()