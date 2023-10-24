from flask import Blueprint, request, jsonify
is_authenticated_api = Blueprint('is_authenticated_api', __name__)
from user.models import User
@is_authenticated_api.route('/is_authenticated', methods=['GET'])
def is_authenticated():
    user = User()
    return user.is_authenticated()
@is_authenticated_api.route('/is_authenticated', methods=['OPTIONS'])
def is_authenticated_preflight():
    return jsonify({'success': True}), 200, {'ContentType': 'application/json'}
