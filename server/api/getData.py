from flask import Blueprint, request, jsonify
import yfinance as yf
import pandas as pd

getData_api = Blueprint('getData_api', __name__)

@getData_api.route('/getData', methods=['POST'])
def get_data():
    sys = request.form['button_value']
    print(sys)

    try:
        data = yf.download(f'{sys}.NS')
        data.to_csv(f"../Data/{sys}.csv")
        data_json = data.reset_index().to_json(orient='records')
        return jsonify({'data': data_json})
    except Exception as e:
        print(f"Sorry, there has been an error {e} for file {sys}")
        return jsonify({'error': str(e)})
