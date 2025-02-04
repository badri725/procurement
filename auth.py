from flask import Blueprint, request, jsonify
from database import db_connection

auth_bp = Blueprint('auth', __name__)

db = db_connection()
cursor = db.cursor(dictionary=True)

# User Login
@auth_bp.route('/login', methods=['POST'])
def login():
    data = request.json
    cursor.execute("SELECT * FROM users WHERE email = %s AND password = %s", (data['email'], data['password']))
    user = cursor.fetchone()
    if user:
        return jsonify({"success": True, "message": "Login successful", "role": user['role']}), 200
    else:
        return jsonify({"success": False, "message": "Invalid credentials"}), 401
