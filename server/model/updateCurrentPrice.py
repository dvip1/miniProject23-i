import logging
import json


def updateCurrentPrice(userId, prices, stockData):
    try:
        # Find the user's document
        user_data = stockData.find_one({"userId": userId})

        if user_data:
            # Get the list of stocks
            stocks = user_data.get('stocks', [])

            # Update the current price of each stock
            for stock in stocks:
                stock_name = stock['stockname']
                if stock_name in prices:
                    stock['current_price'] = prices[stock_name]

            # Update the user's document
            stockData.update_one({"userId": userId}, {
                                 "$set": {"stocks": stocks}})
            logging.info(stocks)
            return json.dumps(stocks)
        else:
            return "No user data found"
    except Exception as e:
        # Log the error
        logging.error(
            f"Error while updating stock prices for user {userId}: {e}")
        return "An error occurred while updating stock prices for user"
