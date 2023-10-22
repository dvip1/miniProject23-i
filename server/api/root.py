from flask import Blueprint, request, jsonify
root_api = Blueprint('root_api', __name__)
@root_api.route('/', methods=['GET'])
def hello():
    return jsonify({'text':'Hello World!'})