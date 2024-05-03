import yfinance as yf
import logging
from flask import Blueprint, request, jsonify
get_stockDetails = Blueprint('GetStockDetails_api', __name__)


@get_stockDetails.route('/stock-data/get-details', methods=['POST'])
def GetStockDetails():
    try:
        data = request.get_json()
        logging.info(f"This is the data I'm getting {data}")
        sym = data.get('sym') + '.NS'
        logging.info(f"This is sym: {sym}")
        ticker_data = yf.Ticker(sym)
        # Convert the ticker data to a dictionary before returning
        return jsonify(ticker_data.info), 200
    except Exception as err:
        logging.error(f"Error while get-details: {err}")
        return jsonify({"err": f"some error has occured {err}"}), 500