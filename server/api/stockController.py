import logging
from model.database import client
from model.getStockPrices import GetStockPrices
from flask import Blueprint, request, jsonify
from model.database import db
from model.getAllStockFromUser import GetAllStockFromUser
from model.updateCurrentPrice import updateCurrentPrice
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

        existing_user_data = stockData.find_one({"userId": user_id})

        stock_data = {
            "stockname": stock_name,
            "purchased_price": purchased_price,
            "date": purchased_date,
            "quantity": quantity,
            "current_price": current_price
        }

        if existing_user_data:
            # Update the stocks list if the user data already exists
            stocks = existing_user_data.get('stocks', [])
            for stock in stocks:
                if stock['stockname'] == stock_name:
                    stock['quantity'] += quantity
                    break
            else:
                stocks.append(stock_data)
            stockData.update_one({"userId": user_id}, {
                                 "$set": {"stocks": stocks}})
            logging.info("User stock data updated successfully")
            return jsonify({"message": "User stock data updated successfully"}), 200
        else:
            # Insert a new document if the user data doesn't exist
            user_data = {
                "userId": user_id,
                "stocks": [stock_data]
            }
            stockData.insert_one(user_data)
            logging.info("User stock data saved successfully")
            return jsonify({"message": "User stock data saved successfully"}), 201
    except Exception as e:
        # Log the error
        logging.error(f"Error while saving user stock data: {e}")
        return jsonify({"message": "An error occurred while saving user stock data"}), 500


@stock_api.route('/stock-data/read', methods=['POST'])
def StockDataAPI_read():
    try:
        logging.info("before anything happens")
        data = request.get_json()
        logging.info(f"before getting userID")
        user_id = data.get('userId')
        logging.info(f"after getting userId ${user_id}")
        if not user_id:
            return jsonify({"message": "Missing Data in the request"}), 400
        tickers = GetAllStockFromUser(userId=user_id, stockData=stockData)
        logging.info(f"this is tickers: ${tickers}")
        prices = GetStockPrices(tickers)
        logging.info(f"this is prices of stocks ${prices}")
        ReadData = updateCurrentPrice(
            prices=prices, userId=user_id, stockData=stockData)
        logging.info(f"this is the read data: ${ReadData}")
        return jsonify(ReadData)
    except Exception as e:
        logging.error(f"Error while saving stock data: {e}")
        return jsonify({"message": f"An error occurred while saving stock data: {str(e)}"}), 500


@stock_api.route('/stock-data/delete', methods=['POST'])
def StockDataAPI_delete():
    try:
        data = request.get_json()
        user_id = data.get('userId')
        stock_name = data.get('stockName')
        if not user_id or not stock_name:
            return jsonify({"message": "Missing required data"}), 400

        # Find the user's document
        user_data = stockData.find_one({"userId": user_id})

        if user_data:
            # Find the stock in the user's list of stocks
            stocks = user_data.get('stocks', [])
            for i, stock in enumerate(stocks):
                if stock['stockname'] == stock_name:
                    # Remove the stock from the list
                    del stocks[i]
                    break
            else:
                return jsonify({"message": "No stock data found to delete"}), 404

            # Update the user's document
            stockData.update_one({"userId": user_id}, {
                                 "$set": {"stocks": stocks}})
            return jsonify({"message": "Stock data deleted successfully"}), 200
        else:
            return jsonify({"message": "No user data found"}), 404
    except Exception as e:
        # Log the error
        logging.error(f"Error while deleting stock data: {e}")
        return jsonify({"message": "An error occurred while deleting stock data"}), 500
