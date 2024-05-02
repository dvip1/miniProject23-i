import yfinance as yf
import logging
from flask import json, request
get_stockDetails = Blueprint('GetStockDetails_api', __name__)


@get_stockDetails.route('/stock-data/get-details', methods=['POST'])
def GetStockDetails():
    try:
        data = request.get_json()
        sym = data.sym
        ticker_data = yf.Ticker(sym)
        return ticker_data.info
    except Exception as err:
        logging.error(f"Error while get-details: ${err}")
        return 0
