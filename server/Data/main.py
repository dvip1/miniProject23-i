
import pandas as pd
import mplfinance as mpf

file = pd.read_csv(f'CGPOWER.csv')


file.Date = pd.to_datetime(file.Date)
#print(file.info())

file = file.set_index('Date')
print(file)
mpf.plot(file,type="candle",volume=True)