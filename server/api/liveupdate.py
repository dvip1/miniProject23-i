from flask import Blueprint, request, jsonify
import websocket
import json

liveUpdate_api = Blueprint('liveUpdate_api', __name__)

@liveUpdate_api.route('/live_update', methods=["POST"])
def getLiveUpdates():
    data = request.get_json()
    company_name = data.get('company_name')

    # WebSocket connection to Yahoo Finance
    def on_message(ws, message):
        data = json.loads(message)
        if "price" in data:
            stock_price = data["price"]
            response_data = {
                "company_name": company_name,
                "stock_price": stock_price
            }
            ws.close()  # Close WebSocket connection after receiving data
            return jsonify(response_data)

    def on_error(ws, error):
        print(error)

    def on_close(ws):
        print("Connection closed")

    def on_open(ws):
        subscribe_message = {
            "subscribe": [f"{company_name}.BO"]  # Assuming the company name is the ticker symbol
        }
        ws.send(json.dumps(subscribe_message))

    websocket.enableTrace(True)
    ws = websocket.WebSocketApp("wss://streamer.finance.yahoo.com/", on_message=on_message, on_error=on_error, on_close=on_close)
    ws.on_open = on_open
    ws.run_forever()

    return jsonify({"message": "Failed to retrieve live updates."})

# Example usage:
# Send a POST request to /live_update endpoint with JSON payload {"company_name": "CGPOWER"}
