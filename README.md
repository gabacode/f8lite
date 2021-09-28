# f8lite
Questo progetto nasce dall'esigenza di comunicare i dati relativi all'incidenza giornaliera del COVID-19 alla popolazione della provincia di Palermo, nel distretto di Bagheria (comuni di Bagheria, Santa Flavia, Ficarazzi, Casteldaccia, e Altavilla Milicia).
I dati sono derivati dal [software gestionale](https://www.totel.it/portfolio/asp-bagheria) per il data-entry utilizzato dal Distretto ASP 39 di Bagheria, e sono utilizzabili secondo [licenza creative commons](https://creativecommons.org/licenses/by/4.0/deed.it), mentre il codice sorgente del portale è distribuito tramite [licenza GPLv3](https://github.com/gabacode/f8lite/blob/main/LICENSE).

Ogni giorno, a fine giornata, verrà aggiornato il file più recente a [questo link](https://github.com/gabacode/f8lite/blob/main/dati-distretto39/dpc-covid19-ita-pa-39-latest.csv), che segue lo [schema adottato dal Dipartimento della Protezione Civile](https://github.com/pcm-dpc/COVID-19/blob/master/dati-andamento-covid19-italia.md) per Regioni, applicata per i singoli comuni del distretto (da verificare da parte di DPC). Questi dati sono ordinati per data di inserimento, e potrebbero essere non affidabili, soprattutto per quanto riguarda il campo "nuovi_positivi". Tali variazioni sono calcolate con l'utilizzo di [questo script](https://github.com/gabacode/f8lite/blob/main/utilities/json2csv.py) in Python, ed aggiornate giornalmente.

I [dati grezzi](https://github.com/gabacode/f8lite/tree/main/public/datasets), raggruppati per data tampone, calcolano invece l'incidenza giornaliera e l'indice 250, e potrebbero rivelarsi più attendibili per il calcolo effettivo dei nuovi_positivi giornalieri. [In attesa di delucidazioni e consigli da parte del DPC](https://github.com/pcm-dpc/COVID-19/issues/1123), entrambe le tipologie di dati sono rese disponibili.

I dati in formato open data, alimentano delle Dashboard sviluppate da [Dennis Angemi](https://github.com/dennisangemi) e sono disponibili per i seguenti paesi:
* [Bagheria](https://informacovid.opendatasicilia.it/d/bagheria)
* [Santa Flavia](https://informacovid.opendatasicilia.it/d/santa-flavia)
* [Ficarazzi](https://informacovid.opendatasicilia.it/d/ficarazzi)
* [Casteldaccia](https://informacovid.opendatasicilia.it/d/casteldaccia)
* [Altavilla Milicia](https://informacovid.opendatasicilia.it/d/altavilla-milicia)

I dati sono inoltre accessibili tramite [Bot Telegram](https://t.me/Covid_19_Sicilia_Bot) grazie al lavoro di [Giovanni Pirrotta](https://github.com/gpirrotta).

Nonostante l’ impegno a mantenere accurati i contenuti del Sito, le informazioni fornite possono presentare inaccuratezze tecniche o errori tipografici. Essendo tutte le informazioni di questo Sito soggette a modifiche/aggiornamenti periodici, esse sono fornite senza alcuna garanzia, implicita o esplicita, di qualsiasi tipo.

## Credits

Vincenzo Martorana - Emanuele Calì - [open data Sicilia](http://opendatasicilia.it)
