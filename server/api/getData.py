from flask import Blueprint, request, jsonify
import yfinance as yf
import pandas as pd


getData_api = Blueprint('getData_api', __name__)


@getData_api.route('/get_data', methods=['POST'])
def get_data():
    sys = request.form['button_value']
    print(sys)

    try:
        dataFrame = pd.read_csv(f"Data/{sys}.csv")
        data = dataFrame.to_json(orient='records')
        return jsonify({'data': data})

    except Exception as e:
        print(f"Sorry, there has been an error {e} for file {sys}")
        return jsonify({'error': str(e)})
