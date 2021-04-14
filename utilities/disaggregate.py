import pandas as pd

input = '../dati-distretto39/dpc-covid19-ita-pa-39.csv'
df = pd.read_csv(input)
keys = [82006,82067,82035,82023,82004]

df['data'] = df['data'].str.slice(0,10)
df[['lat','long']] = df[['lat','long']].round(decimals=6)
df[['totale_ospedalizzati','isolamento_domiciliare','variazione_totale_positivi','nuovi_positivi']] = df[['totale_ospedalizzati','isolamento_domiciliare','variazione_totale_positivi','nuovi_positivi']].round().astype('Int64')

comuni = df.groupby(df.codice_comune)
output = '../dati-comuni/dpc-covid19-ita-pa-'

for key in keys:
    comune = comuni.get_group(key)
    latest = comune.iloc[-1:]
    latest.to_csv(output+str(key)+"-latest.csv",index=None)
    comune.to_csv(output+str(key)+".csv",index=None)

print("Fatto")
