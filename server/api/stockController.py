from ..user.database import client
from flask import Blueprint, request, jsonify
stockData = client['stockData']

root_api = Blueprint('StockData_api', __name__)

@root_api.route('/post/stock-data', methods=['POST'])
def StockDataAPI():
    try:
        data = request.get_json()
        # Validate data
        if not all(key in data for key in ("userId", "stockName", "purchasedPrice", "purchasedDate", "quantity", "currentPrice")):
            return jsonify({"message": "Missing required data"}), 400

        user_id = data.get('userId')
        stock_data = {
            "userId": data.get('userId'),
            "stockname": data.get('stockName'),
            "purchased_price": data.get('purchasedPrice'),
            "date": data.get('purchasedDate'),
            "quantity": data.get('quantity'),
            "current_price": data.get('currentPrice')
        }
        if stockData.find_one({"userId": user_id}) is not None:
            stockData.update_one(
                {"userId": user_id},
                {"$set": {"current_price": data.get('currentPrice')}}
            )
            return jsonify({"message": "successfully updated "}), 200

        # Update current_price for the user's stock data
        stockData.insert_one(stock_data)
        print(stock_data)
        return jsonify({"message": "Stock data saved successfully"}), 201
    except Exception as e:
        # Log the error
        print(f"Error while saving stock data: {e}")
        return jsonify({"message": "An error occurred while saving stock data"}), 500