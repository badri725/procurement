from flask import Blueprint, request, jsonify
from database import db_connection

rma_bp = Blueprint('rma', __name__)

db = db_connection()
cursor = db.cursor(dictionary=True)


# Get All RMA Requests
@rma_bp.route('/', methods=['GET'])
def get_rma_requests():
    cursor.execute("SELECT * FROM rma_requests")
    rma_requests = cursor.fetchall()
    return jsonify(rma_requests), 200


# Create a New RMA Request
@rma_bp.route('/', methods=['POST'])
def create_rma_request():
    data = request.json
    cursor.execute("INSERT INTO rma_requests (order_id, reason, status) VALUES (%s, %s, 'pending')",
                   (data['order_id'], data['reason']))
    db.commit()
    return jsonify({"message": "RMA request created successfully"}), 201


# Approve or Reject RMA Request
@rma_bp.route('/<int:rma_id>/<status>', methods=['PUT'])
def update_rma_status(rma_id, status):
    if status not in ['approved', 'rejected']:
        return jsonify({"error": "Invalid status"}), 400

    cursor.execute("UPDATE rma_requests SET status = %s WHERE id = %s", (status, rma_id))
    db.commit()
    return jsonify({"message": f"RMA request {status} successfully"}), 200
