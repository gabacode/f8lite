import React, { Component } from "react";
import {readRemoteFile} from "react-papaparse";
import {createChart} from "lightweight-charts";

export default class Chart extends Component{

    chart = null;

    componentDidMount(){
        var width = 960;
        var height = 300;

        var chart = createChart(this.props.containerId, {
            width: width,
            height: height,
            layout: {
                textColor: '#333',
                backgroundColor: '#fefefe',
            },
        });

        var dayData = [];
        readRemoteFile(this.props.url, {
            header: true,
            download: true,
            complete: (results) => {
                results.data.map((dt) => {                    
                    if (dt.data){
                        if(this.props.mode==="nuovi_positivi"){
                            dayData.push({
                                time: dt.data,
                                value: parseFloat(dt.nuovi_positivi),
                            });
                        }
                        if(this.props.mode==="deceduti"){
                            dayData.push({
                                time: dt.data,
                                value: parseFloat(dt.deceduti),
                            });
                        }
                    }
                    return dayData;
                });
                var posiLine = chart.addLineSeries({
                    lineColor: 'rgba(38, 198, 218, 1)',
                    lineWidth: 0,
                    visible: true,
                    lineStyle: 1,
                });
                
                posiLine.setData(dayData);
                setPosText(dayData[dayData.length - 1].value);
                chart.subscribeCrosshairMove((param) => {
                    setPosText(param.seriesPrices.get(posiLine));
                });

                var smaData = calculateSMA(dayData, 7);        
                var smaLine = chart.addAreaSeries({
                    color: 'rgba(4, 111, 232, 1)',
                    lineWidth: 2,
                    offset: 5,
                    visible: true,
                });
                smaLine.setData(smaData);
                setMAText(smaData[smaData.length - 1].value);
                chart.subscribeCrosshairMove((param) => {
                    setMAText(param.seriesPrices.get(smaLine));
                });

            },
        });

        var posiLine = chart.addLineSeries();
        posiLine.setData(dayData);

        var smaData = calculateSMA(dayData);
        var smaLine = chart.addAreaSeries();
        smaLine.setData(smaData);


        var legend = document.createElement('div');
        legend.className = 'sma-legend';
        document.getElementById(this.props.containerId).appendChild(legend);

        var smalegend = document.createElement('div');
        smalegend.className = 'sma-legend';
        document.getElementById(this.props.containerId).appendChild(smalegend);

        var label = this.props.label;

        function setPosText(posVal) {
            let val = 'n/a';
            if (posVal !== undefined) {
                val = posVal;
            }
            legend.innerHTML = label+': <span style="color:rgba(44, 130, 201, 1)">' + val + '</span>';
        }
        function setMAText(smaVal) {
            let val = 'n/a';
            if (smaVal !== undefined) {
                val = (Math.round(smaVal * 100) / 100).toFixed(2);
            }
            smalegend.innerHTML = 'SMA7 <span style="color:rgb(8 183 113)">' + val + '</span>';
        }

        function calculateSMA(data, count) {
            var avg = function (data) {
                var sum = 0;
                for (var i = 0; i < data.length; i++) {
                    sum += data[i].value;
                }
                return sum / data.length;
            };
            var result = [];
            for (var i = count - 1, len = data.length; i < len; i++) {
                var val = avg(data.slice(i - count + 1, i));
                const offset = 3;
                result.push({
                    time: (data[i - offset].time),
                    value: val
                });
            }
            return result;
        }

        new ResizeObserver(entries => {
            if (entries.length === 0 || entries[0].target !== document.getElementById(this.props.containerId)) {
                return;
            }
            const newRect = entries[0].contentRect;
            chart.applyOptions({
                width: newRect.width
            });
        }).observe(document.getElementById(this.props.containerId));

    }
  componentWillUnmount() {
    if (this.chart !== null) {
        this.chart.remove();
        this.chart = null;
    }
}

render() {
    return (
        <div id={this.props.containerId}/>
    );
}
}
