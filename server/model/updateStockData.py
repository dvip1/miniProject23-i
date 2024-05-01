import yfinance as yf
import logging
from requests.exceptions import HTTPError

logging.basicConfig(level=logging.DEBUG)


def updateStockData(tickers):
    ticker_data = yf.Tickers(tickers)
    prices = {}
    for ticker in ticker_data.tickers:
        try:
            ticker_info = ticker_data.tickers[ticker].info
            if 'currentPrice' in ticker_info:
                current_price = ticker_info['currentPrice']
                prices[ticker] = current_price
            else:
                logging.error(
                    f"Error: Unable to fetch current price for {ticker}")
        except HTTPError as e:
            logging.error(
                f"HTTP error occurred while fetching data for {ticker}: {e}")
    return prices
