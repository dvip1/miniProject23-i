from flask import Blueprint, request, jsonify
import pandas as pd

getCompanyNames_api = Blueprint('getCompanyNames_api', __name__)


@getCompanyNames_api.route('/getCompanyNames', methods=['GET'])
def getCompanyNames():
    try:
        dataFrame = pd.read_csv('EQUITY_L.csv')
        data = dataFrame.to_json(orient='records')
        return jsonify({'data': data})
    except Exception as e:
        return jsonify({'error': str(e)})
