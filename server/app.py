from flask import Flask, request, jsonify
from flask_cors import CORS
from api.getData import getData_api
from api.root import root_api
from user.sign_up import sign_up_api
from user.sign_in import sign_in_api
from user.sign_out import sign_out_api
from user.isAuthenticated import is_authenticated_api
from api.getCompData import getCompanyNames_api
from api.liveupdate import liveUpdate_api
from api.stockController import stock_api
from api.getStockDetails import get_stockDetails
import secrets
from datetime import timedelta

app = Flask(__name__)
app.secret_key = secrets.token_hex(16)
CORS(app, origins="http://localhost:5173", supports_credentials=True,
     methods=['GET', 'POST', 'PUT', 'DELETE'])
app.config['SESSION_TYPE'] = 'filesystem'  # Change the storage type if needed
app.config['SESSION_PERMANENT'] = True
app.config['PERMANENT_SESSION_LIFETIME'] = timedelta(minutes=30)
app.register_blueprint(root_api)
app.register_blueprint(sign_up_api)
app.register_blueprint(getData_api)
app.register_blueprint(sign_in_api)
app.register_blueprint(sign_out_api)
app.register_blueprint(is_authenticated_api)
app.register_blueprint(getCompanyNames_api)
app.register_blueprint(liveUpdate_api)
app.register_blueprint(stock_api)
app.register_blueprint(get_stockDetails)
if __name__ == "__main__":
    app.run(debug=True)
