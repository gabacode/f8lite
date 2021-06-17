import pandas as pd
import csv
import os
'''
Calcola età degli attuali positivi (wip).
dob  = "Data di nascita"
stato = "Stato paziente"
lib = "Liberato (Guarito)"
'''
now = pd.Timestamp('now')
nowstr = now.strftime('%Y-%m-%d')
newFile = False

folders = ['input','output','public/datasets/byAge']

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
    df = pd.DataFrame(data, columns = ["comune","stato", "lib", "dob"])
    df['dob'] = pd.to_datetime(df['dob'], infer_datetime_format=True)
    df['age'] = (now - df['dob']).astype('<m8[Y]').astype(int)
    pos = df.loc[(df['comune'] == city) & (df['stato'] == "POSITIVO") & (df['lib'] == 0)]
    pos = pd.DataFrame(pos, columns = ['age']).sort_values(by=['age'])
    pos = pos['age'].describe().fillna(0).astype('int').to_frame().T

    pos.insert(0, "data", nowstr, True)
    pos.insert(1, "comune", city.title(), True)

    pos.to_csv (r'../public/datasets/byAge/age_'+str(city).replace(' ','_').lower()+'.csv', index=False, mode='a', header=newFile)

print("Fatto!")
os.remove(url)
