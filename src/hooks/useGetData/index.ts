import { useCallback, useState, useEffect } from 'react';
import { readRemoteFile } from 'react-papaparse';
import { format } from 'date-fns';
import { Data, LatestData, LatestReport, WeeklyReport } from '../../types';

export const useGetData = (daySet: string, latest: string) => {
  const [weeklyReport, setWeeklyReport] = useState<WeeklyReport>();
  const [latestReport, setLatestReport] = useState<LatestReport>();

  const parseData = (url: string, callBack: (data: Data[]) => void) => {
    readRemoteFile(url, {
      download: true,
      header: true,
      dynamicTyping: true,
      complete: results => {
        callBack(results.data as Data[]);
      },
    });
  };

  const getWeekly = useCallback((data: Data[]): void => {
    const length = Object.keys(data).length;
    const nuovi_positivi = [];
    for (let i = 0; i < length; i++) {
      nuovi_positivi.push(data[i].nuovi_positivi);
    }
    const this_week = nuovi_positivi
      .slice(-8)
      .slice(0, -1)
      .reduce((a, b) => a + b);
    const last_week = nuovi_positivi
      .slice(-15)
      .slice(0, -8)
      .reduce((a, b) => a + b);
    setWeeklyReport({
      firstDay: data[0].data,
      lastDay: data[length - 2].data,
      thisWeek: this_week,
      lastWeek: last_week,
    });
  }, []);

  const getLatest = useCallback((data: Data[]): void => {
    const latest = data[0] as LatestData;
    setLatestReport({
      lastUpdate: formatDate(latest.data),
      attuali: latest.totale_positivi,
      ricoverati: latest.totale_ospedalizzati,
      guariti: latest.dimessi_guariti,
      deceduti: latest.deceduti,
      nuovi_positivi: latest.nuovi_positivi,
      variazione: latest.variazione_totale_positivi,
      totale_casi: latest.totale_casi,
      tamponi: latest.tamponi,
    });
  }, []);

  useEffect(() => {
    parseData(daySet, getWeekly);
    parseData(latest, getLatest);
  }, [daySet, getWeekly, getLatest, latest]);

  const formatDate = (date: string) => format(new Date(date), 'dd/MM/yyyy');

  return { formatDate, weeklyReport, latestReport };
};
