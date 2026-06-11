import os
from flask import Flask, send_from_directory, jsonify, request
from database import get_db, init_db
from flask import send_from_directory
from flask_cors import CORS


app = Flask(__name__, static_folder="static")
CORS(app) 

with app.app_context():
    init_db()

 
# React serve & 404
@app.route("/", defaults={"path": ""})
@app.route("/<path:path>")
def serve_react(path):
    if path.startswith("api/"):
        return jsonify({"error": "Not found"}), 404

    full = os.path.join(app.static_folder, path)
    if path and os.path.exists(full):
        return send_from_directory(app.static_folder, path)
  
    if path in ["", "students", "attendance"]:
        return send_from_directory(app.static_folder, "index.html")
   
    return send_from_directory(app.static_folder, "404.html"), 404
 
        
        

        
# admin login

@app.route("/api/login", methods=["POST"])
def login():
    data = request.get_json()
    email = data.get("email")
    password = data.get("password")
    
    if not email or not password:
        return jsonify({"error": "Missing email or password"}), 400
   
    db = get_db()
    admin = db.execute("SELECT * FROM admin WHERE email = ?", (email,)).fetchone()
    db.close()
    if not admin:
            return jsonify({"error": "Invalid email"}), 401
    if admin and admin["password"] == password:
          return jsonify({"message": "Login successful"})
    else:
          return jsonify({"error": "Invalid password"}), 401
     
  

# return all students
@app.route("/api/students", methods=["GET"])
def get_students():
    db = get_db()
    students = db.execute("SELECT * FROM students").fetchall()
    db.close()
    return jsonify([dict(r) for r in students])


@app.route("/api/students", methods=["POST"])
def add_student():
    data = request.get_json()

    name = data.get("name")
    email = data.get("email")
    class_name = data.get("class")

    if not name or not email or not class_name:
        return jsonify({"error": "Missing required fields"}), 400

    db = get_db()

    db.execute(
        "INSERT INTO students (name, email, class) VALUES (?, ?, ?)",
        (name, email, class_name),
    )

    db.commit()
    db.close()

    return jsonify({"message": "Student added successfully"}), 201


#update student data
@app.route("/api/students/<int:id>", methods=["PUT"])
def update_student(id):
    data = request.get_json()
    
     # check all required fields are present
    if not data.get("name") or not data.get("email") or not data.get("class"):
        return jsonify({"error": "Missing required fields"}), 400
   
    conn = get_db()
    conn.execute(
        "UPDATE students SET name=?, email=?, class=? WHERE id=?",
        (data["name"], data.get("email"), data.get("class"), id)
    )
    conn.commit()
    conn.close()
    return jsonify({"message": "Update student successfully!"})

# delete student data
@app.route("/api/students/<int:id>", methods=["DELETE"])
def delete_student(id):
    conn = get_db()
    val=conn.execute("DELETE FROM students WHERE id=?", (id,))
    
    conn.commit()
    conn.close()
    #student id not found
    if val.rowcount == 0:
        return jsonify({"error": "Student not found"}), 404
    return jsonify({"message": "Student deleted successfully!"})

if __name__ == "__main__":
    app.run(debug=True)