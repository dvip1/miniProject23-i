from flask import Blueprint, request, jsonify, session
from user.models import User

sign_out_api = Blueprint('sign_out_api', __name__)

@sign_out_api.route('/sign_out', methods=['POST'])
def sign_out():
    try:
        if 'user_id' in session:
            session.pop('user_id', None)
            return jsonify({'success': True}), 200, {'ContentType': 'application/json'}
        else:
            return jsonify({'error': 'No user is currently signed in'}), 400
    except Exception as e:
        return jsonify({'error': str(e)}), 500
