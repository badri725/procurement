from flask import Blueprint, request, jsonify
from database import db_connection

suppliers_bp = Blueprint('suppliers', __name__)

db = db_connection()
cursor = db.cursor(dictionary=True)

# Get All Suppliers
@suppliers_bp.route('/', methods=['GET'])
def get_suppliers():
    cursor.execute("SELECT * FROM suppliers")
    suppliers = cursor.fetchall()
    return jsonify(suppliers), 200

# Create a New Supplier
@suppliers_bp.route('/', methods=['POST'])
def create_supplier():
    data = request.json
    cursor.execute("INSERT INTO suppliers (name, contact_email, phone, address) VALUES (%s, %s, %s, %s)",
                   (data['name'], data['email'], data['phone'], data['address']))
    db.commit()
    return jsonify({"message": "Supplier onboarded successfully"}), 201
