import React, { FC, useCallback, useEffect, useRef, useState } from 'react';
import { readRemoteFile } from 'react-papaparse';
import { BarPrice, createChart, SingleValueData } from 'lightweight-charts';
import { useSize } from '../hooks/useSize';

interface ChartProps {
  containerId: string;
  url: string;
  mode: string;
  label: string;
}

export const Chart: FC<ChartProps> = ({ containerId, url, mode, label }) => {
  const ref = useRef() as React.MutableRefObject<HTMLDivElement>;
  const size = useSize(ref);
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
              value: parseInt(result.nuovi_positivi),
            });
          }
          if (mode === 'deceduti') {
            dayData.push({
              time: result.data,
              value: parseInt(result.deceduti),
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

  const calculateSMA = (data: SingleValueData[], count: number) => {
    const avg = (data: SingleValueData[]) => {
      let sum = 0;
      for (let i = 0; i < data.length; i++) {
        sum += data[i].value;
      }
      return sum / data.length;
    };
    const result = [];
    for (let i = count - 1; i < data.length; i++) {
      const val = avg(data.slice(i - count + 1, i));
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
        const value = (Math.round(smaVal * 100) / 100).toFixed(2);
        setSmaText(value);
      } else {
        setSmaText('n/a');
      }
    };

    const chart = createChart(ref.current, {
      width: size?.width ?? 960,
      height: 300,
      layout: {
        textColor: '#333',
        backgroundColor: '#fefefe',
      },
    });

    const posiLine = chart.addLineSeries({
      lineWidth: 1,
      lineStyle: 1,
    });
    posiLine.setData(chartData);
    chart.subscribeCrosshairMove(param => {
      if (param.seriesPrices) {
        const value = param.seriesPrices.get(posiLine);
        handleDataText(value as BarPrice);
      }
    });

    const smaLine = chart.addAreaSeries({
      lineWidth: 2,
    });
    smaLine.setData(smaData);
    chart.subscribeCrosshairMove(param => {
      if (param.seriesPrices) {
        const value = param.seriesPrices.get(smaLine);
        handleSMAText(value as BarPrice);
      }
    });

    return () => {
      chart.remove();
    };
  }, [ref, chartData, smaData, size]);

  return (
    <>
      <div id={containerId} ref={ref} />
      <div className="text-left">
        <p className="m-0">
          {label} <span className="text-info">{dataText}</span>
        </p>
        <p>
          SMA7 <span className="text-success">{smaText}</span>
        </p>
      </div>
    </>
  );
};
