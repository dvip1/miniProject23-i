from flask import Flask, request, jsonify
from flask_cors import CORS
from api.getData import getData_api
from api.root import root_api
from api.sign_up import sign_up_api
app = Flask(__name__)
CORS(app, origins="http://localhost:5173", supports_credentials=True, methods= ['GET', 'POST', 'PUT', 'DELETE'] )
app.register_blueprint(root_api)  
app.register_blueprint(sign_up_api)
app.register_blueprint(getData_api)

if __name__ == "__main__":
    app.run(debug=True)