from flask import Flask, request, jsonify
from flask_cors import CORS
from api.getData import getData_api
from api.root import root_api
from user.sign_up import sign_up_api
from user.sign_in import sign_in_api
from user.sign_out import sign_out_api
from user.isAuthenticated import is_authenticated_api
from api.getCompData import getCompanyNames_api
import secrets
from datetime import timedelta
from flask_socketio import SocketIO, send, emit
import websocket

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


def on_message(ws, message):
    print(message)


def on_error(ws, error):
    print(error)


def on_close(ws):
    print("### closed ###")


def on_open(ws):
    ws.send('{"type":"subscribe","symbol":"BINANCE:BTCUSDT"}')


socketIo = SocketIO(app)


@app.route('/connect', methods=['GET'])
def handle_connect():
    ws = websocket.WebSocketApp("wss://ws.finnhub.io?token=copr3p1r01qsvshcju70copr3p1r01qsvshcju7g",
                                on_message=on_message,
                                on_error=on_error,
                                on_close=on_close)
    ws.on_open = on_open
    ws.run_forever()
    return jsonify("Connected")


@socketIo.on('connect')
def connectSockets():
    socketIo.emit("Connected")


if __name__ == "__main__":
    socketIo.run(app, dubug=True)
