import sys
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

path = './dpc/dpc-covid19-ita-pa-39-'

choice = input("Modalita' automatica? y/n\n")

if choice == "n":
    dft_start = input("Inserire data di oggi\n")
    dft = pd.read_json(path+dft_start+'.json')
    dfy_start = input("Inserire data di ieri\n")
    #dfy = pd.read_json(path+dfy_start+'.json')
    dfy = pd.read_csv(path+dfy_start+'.csv')
elif choice == "y":
    try:
        dft = pd.read_json(path+today+'.json')
    except:
        print("Proviamone un altro...")
        pass
    finally:
        dft = pd.read_json(path+'latest.json')
        #dft = pd.read_json(path+yesterday+'latest.json')
        dfy = pd.read_csv(path+yesterday+'.csv')
else:
    "ok..."

assert dft["data"][0] > dfy["data"][0], "Errore ci fu..probabilmente hai dati vecchi"

print("Calcolo differenze...\n")
dft["nuovi_positivi"] = dft["totale_casi"] - dfy["totale_casi"]
dft["variazione_totale_positivi"] = dft["totale_positivi"] - dfy["totale_positivi"]

print(dft["nuovi_positivi"])
print(dft["variazione_totale_positivi"])

choice = input("\nVuoi esportare? y/n\n")
if choice == "y":
    dft.to_csv(path+'latest.csv',index = None)
    print("Fatto!")
else:
    print("Ok, magari un'altra volta, ciao!")
