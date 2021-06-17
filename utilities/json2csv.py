import sys
import math
import pandas as pd
from datetime import datetime, timedelta
'''
Estrai e compara i dati di oggi con quelli di ieri
'''
sys.tracebacklimit=0
today = datetime.today()
yesterday = today - timedelta(days=1)
today = today.strftime('%Y%m%d')
yesterday = yesterday.strftime('%Y%m%d')

path = '../dati-distretto39/dpc-covid19-ita-pa-39'

choice = input("Modalita' automatica? y/n\n")

if choice == "y":
    dft = pd.read_json(path+"-"+today+'.json')
    dfy = pd.read_csv(path+"-"+yesterday+'.csv')
else:
    dft_start = input("Inserire data di oggi\n")
    dft = pd.read_json(path+"-"+dft_start+'.json')
    dfy_start = input("Inserire data di ieri\n")
    dfy = pd.read_csv(path+"-"+dfy_start+'.csv')

assert dft["data"][0] > dfy["data"][0], "Errore ci fu..probabilmente hai dati vecchi"

print("Calcolo differenze...\n")
dft["nuovi_positivi"] = dft["totale_casi"] - dfy["totale_casi"]
dft["variazione_totale_positivi"] = dft["totale_positivi"] - dfy["totale_positivi"]

print(dft["nuovi_positivi"])
print(dft["variazione_totale_positivi"])

dft[['lat','long']] = dft[['lat','long']].round(decimals=6)

choice = input("\nVuoi esportare? y/n\n")
if choice == "y":
    dft.to_csv(path+"-"+today+'.csv',index = None)
    dft.to_csv(path+'.csv', mode = 'a', index = None, header = False)
    dft.to_csv(path+"-"+'latest.csv',index = None)
else:
    sys.exit()

#Disaggrega comuni
input = path+'.csv'
df = pd.read_csv(input, converters={'codice_comune': '{:0>6}'.format})
keys = ["082006","082067","082035","082023","082004"]

df.rename(columns = {'distretto':'sigla_provincia'}, inplace = True)
df['sigla_provincia'] = "PA"

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

print("Fatto!")

