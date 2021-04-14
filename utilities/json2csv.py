import sys
import math
import pandas as pd
from datetime import datetime, timedelta
'''
Estrai e compara i dati di oggi con quelli di ieri,
molto instabile, attualmente indicato solo per uso interno.
Work in progress...
'''
sys.tracebacklimit=0
today = datetime.today()
yesterday = today - timedelta(days=1)
today = today.strftime('%Y%m%d')
yesterday = yesterday.strftime('%Y%m%d')

path = '../dati-distretto39/dpc-covid19-ita-pa-39'

choice = input("Modalita' automatica? y/n\n")

if choice == "n":
    dft_start = input("Inserire data di oggi\n")
    dft = pd.read_json(path+"-"+dft_start+'.json')
    dfy_start = input("Inserire data di ieri\n")
    dfy = pd.read_csv(path+"-"+dfy_start+'.csv')
    #dfy = pd.read_json(path+dfy_start+'.json')
elif choice == "y":
    dft = pd.read_json(path+"-"+today+'.json')
    dfy = pd.read_csv(path+"-"+yesterday+'.csv')
else:
    print("ok...")

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
    print("Fatto!")
else:
    print("Ok, magari un'altra volta, ciao!")
