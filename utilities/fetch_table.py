from datetime import date
import pandas as pd
import numpy as np
import csv
import os
'''
Importa il dataset ed estrai i dati desiderati.
dt1  = "Data primo tampone"
et1  = "Esito primo tampone"
ddec = "Data decesso"
'''
folders = ['input','output']

for folder in folders:
    try:
        os.makedirs('../'+folder)
    except Exception as e:
        print(e)

print("Caricamento dati...")
url = '../input/positivi.csv'

try:
    data = pd.read_csv(url)
except Exception:
    raise SystemExit('File non disponibile...')

scope = ["BAGHERIA", "SANTA FLAVIA", "FICARAZZI", "CASTELDACCIA", "ALTAVILLA MILICIA"]

for city in scope:
    df = pd.DataFrame(data, columns = ["comune","dt1","et1","ddec"])

    pos = df.loc[(df['comune'] == city) & (df['dt1'].str.len()>1) & (df['et1'] == "POSITIVO")].sort_values(by=['dt1'])
    dec = df.loc[(df['comune'] == city) & (df['ddec'].str.len()>1)].sort_values(by=['ddec'])
    
    if (pos['dt1'].min() <= dec['ddec'].min()):
        min_range = pos['dt1'].min()
    else:
        min_range = dec['ddec'].min()

    if (pos['dt1'].max() >= dec['ddec'].max()):
        max_range = pos['dt1'].max()
    else:
        max_range = dec['ddec'].max()    

    r1 = pd.date_range(min_range, max_range)
    r2 = pd.date_range(min_range, max_range)

    pos = pd.DataFrame(pos, columns = ["dt1"]).groupby(['dt1']).size()
    dec = pd.DataFrame(dec, columns = ["ddec"]).groupby(['ddec']).size()

    pos.index = pd.DatetimeIndex(pos.index)
    dec.index = pd.DatetimeIndex(dec.index)

    p1 = pd.DataFrame(pos.reindex(r1, fill_value=0)).reset_index()
    p2 = pd.DataFrame(dec.reindex(r2, fill_value=0)).reset_index()

    p1.columns = ['data', 'nuovi_positivi']
    p2.columns = ['data', 'deceduti']

    p = pd.merge(p1, p2, how='outer', on = 'data')

    p.insert(1, "comune", city.title(), True)

    p.to_csv (r'../output/1d_'+str(city).replace(' ','_').lower()+'.csv', index = False, header = True)


print("Fatto!")
os.remove(url)
