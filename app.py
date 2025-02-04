from flask import Flask, jsonify
from flask_cors import CORS
from database import db_connection
from routes.orders import orders_bp
from routes.auth import auth_bp
from routes.suppliers import suppliers_bp
from routes.contracts import contracts_bp
from routes.inventory import inventory_bp
from routes.rma import rma_bp



app = Flask(__name__)
CORS(app, resources={r"/*": {"origins": "*"}})

# Register Blueprints
app.register_blueprint(auth_bp, url_prefix='/auth')
app.register_blueprint(orders_bp, url_prefix='/orders')
app.register_blueprint(suppliers_bp, url_prefix='/suppliers')
app.register_blueprint(contracts_bp, url_prefix='/contracts')
app.register_blueprint(inventory_bp, url_prefix='/inventory')
app.register_blueprint(rma_bp, url_prefix='/rma')

@app.route('/')
def home():
    return jsonify({"message": "Welcome to Procurement API"})

if __name__ == '__main__':
    app.run(debug=True, port=5001)
