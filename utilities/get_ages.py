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

    bins = [float("-inf"),10,20,30,40,50,60,70,80,90,float("inf")]
    labels = ['0-10','11-20','21-30','31-40','41-50','51-60','61-70','71-80','81-90','+90']
    pos['range'] = pd.cut(pos['age'], bins, labels=labels)
    pos = pd.DataFrame(pos, columns = ["range"]).groupby(['range']).size().reset_index()
    pos.columns = ['age','num']

    nums = list(pos['num'])
    pos = pd.DataFrame(columns=labels)
    pos.loc[len(pos.index)+1] = nums

    pos.insert(0, "data", nowstr, True)
    pos.insert(1, "comune", city.title(), True)

    pos.to_csv (r'../public/datasets/byAge/age_'+str(city).replace(' ','_').lower()+'.csv', index=False, mode='a', header=newFile)

print("Fatto!")
os.remove(url)
