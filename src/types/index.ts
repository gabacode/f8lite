export interface Comune {
  cityName: string;
  scope: string;
  path: string;
  pop: number;
  istat: string;
}

export interface DailyData {
  data: string;
  comune: string;
  nuovi_positivi: number;
  deceduti: number;
}

export interface LatestData {
  data: string;
  sigla_provincia: string;
  codice_comune: string;
  denominazione_comune: string;
  lat: number;
  long: number;
  ricoverati_con_sintomi: number;
  terapia_intensiva: number;
  totale_ospedalizzati: number;
  isolamento_domiciliare: number;
  totale_positivi: number;
  variazione_totale_positivi: number;
  nuovi_positivi: number;
  dimessi_guariti: number;
  deceduti: number;
  totale_casi: number;
  tamponi: number;
  casi_testati: number;
  note: string;
  ingressi_terapia_intensiva: number;
  note_test: string;
  note_casi: string;
}

export interface WeeklyReport {
  firstDay: string;
  lastDay: string;
  thisWeek: number;
  lastWeek: number;
}

export interface LatestReport {
  lastUpdate: string;
  attuali: number;
  ricoverati: number;
  guariti: number;
  deceduti: number;
  nuovi_positivi: number;
  variazione: number;
  totale_casi: number;
  tamponi: number;
}

export type Data = LatestData | DailyData;
