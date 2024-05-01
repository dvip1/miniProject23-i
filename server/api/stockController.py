import logging
from model.database import client
from model.updateStockData import updateStockData
from flask import Blueprint, request, jsonify
from model.database import db
stockData = db['stockData']

stock_api = Blueprint('StockData_api', __name__)


@stock_api.route('/stock-data/create', methods=['POST'])
def StockDataAPI_create():
    logging.info("Received request to create stock data")
    try:
        data = request.get_json()
        if not all(key in data for key in ("userId", "stockName", "purchasedPrice", "purchasedDate", "quantity", "currentPrice")):
            logging.warning("Missing required data in request")
            return jsonify({"message": "Missing required data"}), 400

        user_id = data.get('userId')
        stock_name = data.get('stockName')
        purchased_price = data.get('purchasedPrice')
        purchased_date = data.get('purchasedDate')
        quantity = data.get('quantity')
        current_price = data.get('currentPrice')

        logging.info(
            f"Processing stock data for user {user_id} and stock {stock_name}")

        existing_stock_data = stockData.find_one(
            {"userId": user_id, "stockname": stock_name})

        if existing_stock_data:
            new_quantity = existing_stock_data['quantity'] + quantity
            stockData.update_one({"userId": user_id, "stockname": stock_name}, {
                                 "$set": {"quantity": new_quantity}})
            logging.info("Stock data updated successfully")
            return jsonify({"message": "Stock data updated successfully"}), 200
        else:
            # Insert a new document if the user's stock data doesn't exist
            stock_data = {
                "userId": user_id,
                "stockname": stock_name,
                "purchased_price": purchased_price,
                "date": purchased_date,
                "quantity": quantity,
                "current_price": current_price
            }
            stockData.insert_one(stock_data)
            logging.info("Stock data saved successfully")
            return jsonify({"message": "Stock data saved successfully"}), 201
    except Exception as e:
        # Log the error
        logging.error(f"Error while saving stock data: {e}")
        return jsonify({"message": "An error occurred while saving stock data"}), 500


@stock_api.route('/stock-data/read', methods=['GET'])
def StockDataAPI_read():
    try:
        tickers = "msft aapl goog"
        prices = updateStockData(tickers)
        return jsonify({"message": f"It's working ${prices}"}), 200

    except Exception as e:
        print(f"Error while saving stock data: {e}")
        return jsonify({"message": f"An error occurred while saving stock data: {str(e)}"}), 500

@stock_api.route('/stock-data/delete', methods=['POST'])
def StockDataAPI_delete():
    try:
        data = request.get_json()
        user_id = data.get('userId')
        stock_name = data.get('stockName')
        if not user_id or not stock_name:
            return jsonify({"message": "Missing required data"}), 42
        # Delete the document
        result = stockData.delete_one({"userId": user_id, "stockname": stock_name})
        
        if result.deleted_count > 0:
            return jsonify({"message": "Stock data deleted successfully"}), 200
        else:
            return jsonify({"message": "No stock data found to delete"}), 404
    except Exception as e:
        # Log the error
        print(f"Error while deleting stock data: {e}")
        return jsonify({"message": "An error occurred while deleting stock data"}), 500