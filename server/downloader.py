import pandas as pd
import yfinance as yf

eqlist = pd.read_csv("EQUITY_L.csv")
for i in range(1820):
    sys = eqlist["SYMBOL"][i]
    try:
        data = yf.download(f'{sys}.NS')
        data.to_csv(f"Data/{sys}.csv")
    except Exception as e:
        print(f"Sorry there as been an error{e} for file{sys} ")
