from flask import Blueprint, request, jsonify
sign_in_api = Blueprint('sign_in_api', __name__)
from user.models import User
@sign_in_api.route('/sign_in', methods=['POST'])
def sign_in():
    user = User()
    return user.sign_in()
@sign_in_api.route('/sign_in', methods=['OPTIONS'])
def sign_in_preflight():
    return jsonify({'success': True}), 200, {'ContentType': 'application/json'}
