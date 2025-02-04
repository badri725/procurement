from flask import Blueprint, request, jsonify
from database import db_connection

inventory_bp = Blueprint('inventory', __name__)

db = db_connection()
cursor = db.cursor(dictionary=True)

# Get All Inventory Items
@inventory_bp.route('/', methods=['GET'])
def get_inventory():
    cursor.execute("SELECT * FROM inventory")
    inventory = cursor.fetchall()
    return jsonify(inventory), 200

# Add New Inventory Item
@inventory_bp.route('/', methods=['POST'])
def add_inventory_item():
    data = request.json
    cursor.execute("INSERT INTO inventory (product_name, quantity, reorder_level, supplier_id) VALUES (%s, %s, %s, %s)",
                   (data['product_name'], data['quantity'], data['reorder_level'], data['supplier_id']))
    db.commit()
    return jsonify({"message": "Inventory item added successfully"}), 201

# Restock Inventory Item
@inventory_bp.route('/<int:item_id>/restock', methods=['PUT'])
def restock_inventory_item(item_id):
    cursor.execute("UPDATE inventory SET quantity = quantity + 10 WHERE id = %s", (item_id,))
    db.commit()
    return jsonify({"message": "Inventory item restocked successfully"}), 200
