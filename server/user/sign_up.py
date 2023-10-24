from flask import Blueprint, request, jsonify
sign_up_api = Blueprint('sign_up_api', __name__)
from user.models import User
@sign_up_api.route('/sign_up', methods=['POST'])
def sign_up():
    user = User()
    return user.signup()
@sign_up_api.route('/sign_up', methods=['OPTIONS'])
def sign_up_preflight():
    return jsonify({'success': True}), 200, {'ContentType': 'application/json'}

