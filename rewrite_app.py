from pathlib import Path
path = Path('app.py')
text = path.read_text(encoding='utf-8')
new_text = '''import os
from dotenv import load_dotenv
from flask import Flask, send_from_directory, jsonify, request
from flask_cors import CORS
from database import get_db, init_db

load_dotenv()

app = Flask(__name__, static_folder='static')
CORS(app)

with app.app_context():
    init_db()

@app.route('/', defaults={'path': ''})
@app.route('/<path:path>')
def serve_react(path):
    if path.startswith('api/'):
        return jsonify({'error': 'Not found'}), 404
    full = os.path.join(app.static_folder, path)
    if path and os.path.exists(full):
        return send_from_directory(app.static_folder, path)
    if path in ['', 'students', 'attendance']:
        return send_from_directory(app.static_folder, 'index.html')
    return send_from_directory(app.static_folder, '404.html'), 404

@app.route('/api/login', methods=['POST'])
def login():
    data = request.get_json()
    email = data.get('email')
    password = data.get('password')
    if not email or not password:
        return jsonify({'response': 'Missing email or password'}), 400
    db = get_db()
    cursor = db.cursor()
    cursor.execute('SELECT * FROM admin WHERE email = %s', (email,))
    admin = cursor.fetchone()
    cursor.close()
    db.close()
    if not admin:
        return jsonify({'response': 'Invalid email'}), 401
    if admin['password'] == password:
        return jsonify({'response': 'Login successful'})
    return jsonify({'response': 'Invalid password'}), 401

@app.route('/api/students', methods=['GET'])
def get_students():
    db = get_db()
    cursor = db.cursor()
    cursor.execute('SELECT * FROM students')
    students = cursor.fetchall()
    cursor.close()
    db.close()
    return jsonify([dict(r) for r in students])

@app.route('/api/students', methods=['POST'])
def add_student():
    data = request.get_json()
    name = data.get('name')
    email = data.get('email')
    class_name = data.get('class')
    if not name or not email or not class_name:
        return jsonify({'error': 'Missing required fields'}), 400
    db = get_db()
    cursor = db.cursor()
    cursor.execute('INSERT INTO students (name, email, class) VALUES (%s, %s, %s)', (name, email, class_name))
    db.commit()
    cursor.close()
    db.close()
    return jsonify({'message': 'Student added successfully'}), 201

@app.route('/api/students/<int:id>', methods=['PUT'])
def update_student(id):
    data = request.get_json()
    if not data.get('name') or not data.get('email') or not data.get('class'):
        return jsonify({'error': 'Missing required fields'}), 400
    db = get_db()
    cursor = db.cursor()
    cursor.execute('UPDATE students SET name=%s, email=%s, class=%s WHERE id=%s', (data['name'], data['email'], data['class'], id))
    db.commit()
    cursor.close()
    db.close()
    return jsonify({'message': 'Update student successfully!'})

@app.route('/api/students/<int:id>', methods=['DELETE'])
def delete_student(id):
    db = get_db()
    cursor = db.cursor()
    cursor.execute('DELETE FROM students WHERE id=%s', (id,))
    db.commit()
    rowcount = cursor.rowcount
    cursor.close()
    db.close()
    if rowcount == 0:
        return jsonify({'error': 'Student not found'}), 404
    return jsonify({'message': 'Student deleted successfully!'})

@app.route('/api/attendance', methods=['GET'])
def get_attendance():
    date = request.args.get('date')
    student_id = request.args.get('student_id')
    if not date:
        return jsonify({'error': 'Missing required query parameter: date'}), 400
    db = get_db()
    cursor = db.cursor()
    query = 'SELECT * FROM attendance WHERE date = %s'
    params = [date]
    if student_id:
        query += ' AND student_id = %s'
        params.append(student_id)
    cursor.execute(query, params)
    attendance_rows = cursor.fetchall()
    cursor.close()
    db.close()
    return jsonify([dict(r) for r in attendance_rows])

@app.route('/api/attendance', methods=['POST'])
def add_attendance():
    data = request.get_json() or {}
    student_id = data.get('student_id')
    status = data.get('status')
    date = data.get('date')
    if not student_id or not status or not date:
        return jsonify({'error': 'Missing required fields'}), 400
    db = get_db()
    cursor = db.cursor()
    cursor.execute('SELECT id FROM attendance WHERE student_id=%s AND date=%s', (student_id, date))
    existing = cursor.fetchone()
    if existing:
        attendance_id = existing['id']
        cursor.execute('UPDATE attendance SET status=%s WHERE id=%s', (status, attendance_id))
    else:
        cursor.execute('INSERT INTO attendance (student_id, date, status) VALUES (%s, %s, %s) RETURNING id', (student_id, date, status))
        attendance_id = cursor.fetchone()['id']
    db.commit()
    cursor.close()
    db.close()
    return jsonify({'id': attendance_id, 'student_id': student_id, 'date': date, 'status': status}), 201

@app.route('/api/attendance/<int:id>', methods=['PUT'])
def update_attendance(id):
    data = request.get_json() or {}
    status = data.get('status')
    date = data.get('date')
    if not status or not date:
        return jsonify({'error': 'Missing required fields'}), 400
    db = get_db()
    cursor = db.cursor()
    cursor.execute('UPDATE attendance SET status=%s, date=%s WHERE id=%s', (status, date, id))
    if cursor.rowcount == 0:
        cursor.close()
        db.close()
        return jsonify({'error': 'Attendance record not found'}), 404
    db.commit()
    cursor.close()
    db.close()
    return jsonify({'message': 'Attendance updated successfully', 'id': id, 'status': status, 'date': date})

if __name__ == '__main__':
    app.run(debug=True)
'''
path.write_text(new_text, encoding='utf-8')
print('app.py rewritten')
