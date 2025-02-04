from flask import Blueprint, request, jsonify
from database import db_connection

contracts_bp = Blueprint('contracts', __name__)

db = db_connection()
cursor = db.cursor(dictionary=True)

# Get All Contracts
@contracts_bp.route('/', methods=['GET'])
def get_contracts():
    cursor.execute("SELECT * FROM contracts")
    contracts = cursor.fetchall()
    return jsonify(contracts), 200

# Create a New Contract
@contracts_bp.route('/', methods=['POST'])
def create_contract():
    data = request.json
    cursor.execute("INSERT INTO contracts (supplier_id, contract_details, start_date, end_date) VALUES (%s, %s, %s, %s)",
                   (data['supplier_id'], data['contract_details'], data['start_date'], data['end_date']))
    db.commit()
    return jsonify({"message": "Contract created successfully"}), 201

# Renew Contract
@contracts_bp.route('/<int:contract_id>/renew', methods=['PUT'])
def renew_contract(contract_id):
    cursor.execute("UPDATE contracts SET end_date = DATE_ADD(end_date, INTERVAL 1 YEAR) WHERE id = %s", (contract_id,))
    db.commit()
    return jsonify({"message": "Contract renewed successfully"}), 200
