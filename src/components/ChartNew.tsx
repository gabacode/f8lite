import React, { FC, useCallback, useEffect, useRef, useState } from 'react';
import { readRemoteFile } from 'react-papaparse';
import { BarPrice, createChart, SingleValueData } from 'lightweight-charts';

interface ChartProps {
  containerId: string;
  url: string;
  mode: string;
  label: string;
}

export const Chart: FC<ChartProps> = ({ url, mode, label }) => {
  const ref = useRef() as React.MutableRefObject<HTMLDivElement>;
  const [chartData, setChartData] = useState<SingleValueData[]>([]);
  const [smaData, setSmaData] = useState<SingleValueData[]>([]);
  const [dataText, setDataText] = useState('n/a');
  const [smaText, setSmaText] = useState('n/a');

  const getData = useCallback((url: string, mode: string) => {
    const dayData: SingleValueData[] = [];
    readRemoteFile(url, {
      header: true,
      download: true,
      skipEmptyLines: true,
      complete: results => {
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        results.data.map((result: any) => {
          if (mode === 'nuovi_positivi') {
            dayData.push({
              time: result.data,
              value: result.nuovi_positivi,
            });
          }
          if (mode === 'deceduti') {
            dayData.push({
              time: result.data,
              value: result.deceduti,
            });
          }
        });
        setSmaData(calculateSMA(dayData, 7));
        setDataText(dayData[dayData.length - 1].value.toString());
        setChartData(dayData);
      },
    });
  }, []);

  useEffect(() => {
    getData(url, mode);
  }, [url, mode, getData]);

  const calculateSMA = (data: SingleValueData[], period: number) => {
    const avg = (data: SingleValueData[]) => {
      let sum = 0;
      for (let i = 0; i < data.length; i++) {
        sum += data[i].value;
      }
      return sum / data.length;
    };
    const result = [];
    for (let i = period - 1, len = data.length; i < len; i++) {
      const val = avg(data.slice(i - period + 1, i));
      const offset = 3;
      result.push({
        time: data[i - offset].time,
        value: val,
      });
    }
    return result as SingleValueData[];
  };

  useEffect(() => {
    const handleDataText = (dataVal: BarPrice) => {
      if (dataVal) {
        const value = dataVal.toString();
        setDataText(value);
      } else {
        setDataText('n/a');
      }
    };

    const handleSMAText = (smaVal: BarPrice) => {
      if (smaVal) {
        console.log(smaVal);
        const value = (Math.round(smaVal * 100) / 100).toFixed(2);
        setSmaText(value);
      } else {
        setSmaText('n/a');
      }
    };

    const chart = createChart(ref.current, {
      width: 960,
      height: 300,
      layout: {
        textColor: '#333',
        backgroundColor: '#fefefe',
      },
    });

    const posiLine = chart.addLineSeries({
      color: 'rgb(38, 198, 218)',
      lineWidth: 1,
      visible: false,
      lineStyle: 1,
    });
    posiLine.setData(chartData);

    const smaLine = chart.addAreaSeries({
      lineColor: 'rgb(4, 111, 232)',
      lineWidth: 1,
      // offset: 5,
      visible: true,
    });
    smaLine.setData(smaData);

    chart.subscribeCrosshairMove(param => {
      if (param.seriesPrices) {
        const value = param.seriesPrices.get(posiLine);
        handleDataText(value as BarPrice);
      }
    });

    chart.subscribeCrosshairMove(param => {
      if (param.seriesPrices) {
        const value = param.seriesPrices.get(smaLine);
        handleSMAText(value as BarPrice);
      }
    });

    return () => {
      chart.remove();
    };
  }, [ref, chartData, smaData]);

  return (
    <>
      <div ref={ref} />
      <div className="text-left">
        <p className="m-0">
          SMA7 <span className="text-success">{smaText}</span>
        </p>
        <p>
          {label} <span className="text-info">{dataText}</span>
        </p>
      </div>
    </>
  );
};
