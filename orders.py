from flask import Blueprint, request, jsonify
from database import db_connection

orders_bp = Blueprint('orders', __name__)

db = db_connection()
cursor = db.cursor(dictionary=True)


# Get All Orders
@orders_bp.route('/', methods=['GET'])
def get_orders():
    cursor.execute("SELECT * FROM purchase_orders")
    orders = cursor.fetchall()
    return jsonify(orders), 200


# Create New Order
@orders_bp.route('', methods=['POST'])
def create_order():
    data = request.json

    # Validate input fields
    if not all(k in data for k in ["order_number", "buyer_id", "supplier_id", "total_amount"]):
        return jsonify({"error": "Missing required fields"}), 400

    try:
        # Ensure data types are correct
        order_number = str(data['order_number']).strip()
        buyer_id = int(data['buyer_id'])
        supplier_id = int(data['supplier_id'])
        total_amount = float(data['total_amount'])

        # Check if buyer exists
        cursor.execute("SELECT id FROM users WHERE id = %s", (buyer_id,))
        if not cursor.fetchone():
            return jsonify({"error": "Buyer ID does not exist"}), 400

        # Check if supplier exists
        cursor.execute("SELECT id FROM suppliers WHERE id = %s", (supplier_id,))
        if not cursor.fetchone():
            return jsonify({"error": "Supplier ID does not exist"}), 400

        # Insert into database
        cursor.execute(
            "INSERT INTO purchase_orders (order_number, buyer_id, supplier_id, total_amount, status) VALUES (%s, %s, %s, %s, 'pending')",
            (order_number, buyer_id, supplier_id, total_amount))
        db.commit()

        return jsonify({"message": "Order created successfully"}), 201

    except ValueError:
        return jsonify({"error": "Invalid data type"}), 400
    except Exception as e:
        return jsonify({"error": str(e)}), 500



# Approve or Reject Order
@orders_bp.route('/<int:order_id>/<status>', methods=['PUT'])
def update_order_status(order_id, status):
    if status not in ['approved', 'rejected']:
        return jsonify({"error": "Invalid status"}), 400

    cursor.execute("UPDATE purchase_orders SET status = %s WHERE id = %s", (status, order_id))
    db.commit()
    return jsonify({"message": f"Order {status} successfully"}), 200


# Delete Order
@orders_bp.route('/<int:order_id>', methods=['DELETE'])
def delete_order(order_id):
    cursor.execute("DELETE FROM purchase_orders WHERE id = %s", (order_id,))
    db.commit()
    return jsonify({"message": "Order deleted successfully"}), 200
