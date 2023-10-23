from flask import Flask, request, jsonify
from flask_cors import CORS
from api.getData import getData_api
from api.root import root_api
from user.sign_up import sign_up_api
from user.sign_in import sign_in_api
from user.sign_out import sign_out_api
from user.isAuthenticated import is_authenticated_api

app = Flask(__name__)
CORS(app, origins="http://localhost:5173", supports_credentials=True, methods= ['GET', 'POST', 'PUT', 'DELETE'] )
app.register_blueprint(root_api)  
app.register_blueprint(sign_up_api)
app.register_blueprint(getData_api)
app.register_blueprint(sign_in_api)
app.register_blueprint(sign_out_api)    
app.register_blueprint(is_authenticated_api)    
if __name__ == "__main__":
    app.run(debug=True)