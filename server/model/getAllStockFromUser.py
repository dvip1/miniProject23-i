import logging
def GetAllStockFromUser(userId, stockData):
    try:
        # Find the user's document
        user_data = stockData.find_one({"userId": userId})

        if user_data:
            # Get the list of stocks
            stocks = user_data.get('stocks', [])

            # Get the stock names, append '.NS' and convert to uppercase
            stock_names = [stock['stockname'].upper() + '.NS' for stock in stocks]

            # Convert the list of stock names to a string
            stock_names_str = ' '.join(stock_names)

            return stock_names_str
        else:
            return "No user data found"
    except Exception as e:
        # Log the error
        logging.error(f"Error while getting stocks for user {userId}: {e}")
        return "An error occurred while getting stocks for user"