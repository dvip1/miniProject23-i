import yfinance as yf
import logging
from requests.exceptions import HTTPError

logging.basicConfig(level=logging.DEBUG)


def GetStockPrices(tickers):
    ticker_data = yf.Tickers(tickers)
    prices = {}
    for ticker in ticker_data.tickers:
        ticker_info = ticker_data.tickers[ticker].info
        if 'currentPrice' in ticker_info:
            current_price = ticker_info['currentPrice']
            # Convert the ticker to lowercase and remove the '.NS' extension
            formatted_ticker = ticker.replace('.NS', '')
            prices[formatted_ticker] = current_price
            logging.info(f"The current price of {formatted_ticker} is: ${current_price}")
        else:
            logging.error(f"Error: Unable to fetch current price for {ticker}")
    return prices