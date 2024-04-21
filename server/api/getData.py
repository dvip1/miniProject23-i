from flask import Blueprint, request, jsonify
import yfinance as yf
import pandas as pd
from tradingview_ta import TA_Handler, Interval, Exchange

getData_api = Blueprint('getData_api', __name__)


@getData_api.route('/get_data', methods=['POST'])
def get_data():
    print(request.form)
    sys = request.form['button_value']
    period = request.form['period']
    print(sys)
    try:
        recommend = TA_Handler(
            symbol=sys,
            screener="India",
            exchange="bse",
            interval=Interval.INTERVAL_1_DAY,
        )
        recommendation = recommend.get_analysis().summary
        dataFrame = yf.Ticker(
            sys + '.NS').history(period=period, interval='1d')
        dataFrame.reset_index(inplace=True)
        if 'Datetime' in dataFrame.columns:
            dataFrame.rename(columns={'Datetime': 'Date'}, inplace=True)
        dataFrame['Date'] = pd.to_datetime(dataFrame['Date']).dt.date
        data = dataFrame.to_json(orient='records')
        return jsonify({
            "data": data,
            "recommend": recommendation
        })

    except Exception as e:
        print(f"Sorry, there has been an error {e} for symbol {sys}")
        return jsonify({'error': str(e)})
