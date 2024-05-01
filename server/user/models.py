from flask import Flask, jsonify, request, session
import uuid
from passlib.hash import pbkdf2_sha256
from model.database import db

class User:
    def signup(self):
        try:
            data = request.get_json()
            email = data.get('email')
            password = data.get('password')

            if not email or not password:
                return jsonify({'error': 'Missing email or password'}), 400

            if db.users.find_one({'email': email}):
                return jsonify({'error': 'User already exists'}), 400

            user = {
                '_id': uuid.uuid4().hex,
                'email': email,
                'password': pbkdf2_sha256.hash(password),
            }
            if db.users.insert_one(user):
                session['user_id'] = user['_id']  # Store user ID in session
                # Remove password before returning user
                user.pop('password', None)
                return jsonify('User created'), 200

            return jsonify({'error': 'Signup failed'}), 400
        except Exception as e:
            return jsonify({'error': str(e)}), 500

    def sign_in(self):
        try:
            data = request.get_json()
            email = data.get('email')
            password = data.get('password')

            if not email or not password:
                return jsonify({'error': 'Missing email or password'}), 400

            user = db.users.find_one({'email': email})

            if user and pbkdf2_sha256.verify(password, user['password']):
                session['user_id'] = user['_id']  # Store user ID in session
                # Remove password before returning user
                user.pop('password', None)
                return jsonify(user), 200

            return jsonify({'error': 'Invalid login credentials'}), 401
        except Exception as e:
            return jsonify({'error': str(e)}), 500

    def is_authenticated(self):
        try:
            if 'user_id' in session:
                user = db.users.find_one({'_id': session['user_id']})
                # Remove password before returning user
                user.pop('password', None)
                return jsonify(user), 200
            else:
                return jsonify({'error': 'No user is currently signed in'}), 400
        except Exception as e:
            return jsonify({'error': str(e)}), 500
