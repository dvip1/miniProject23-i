from flask import Blueprint, request, jsonify
import yfinance as yf
import pandas as pd


getData_api = Blueprint('getData_api', __name__)


@getData_api.route('/get_data', methods=['POST'])
def get_data():
    sys = request.form['button_value']
    print(sys)

    try:
        dataFrame = yf.Ticker(sys + '.NS').history(period="max")
        dataFrame.reset_index(inplace=True)  
        dataFrame['Date'] = dataFrame['Date'].dt.strftime('%Y-%m-%d')  # Convert dates to 'YYYY-MM-DD' format
        data = dataFrame.to_json(orient='records')
        return jsonify({'data': data})

    except Exception as e:
        print(f"Sorry, there has been an error {e} for symbol {sys}")
        return jsonify({'error': str(e)})