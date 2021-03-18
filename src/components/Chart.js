import {readRemoteFile} from "react-papaparse";
import {createChart} from "lightweight-charts";

document.body.style.position = 'relative';
var container = document.createElement('div');
document.body.appendChild(container);

var width = 1024;
var height = 300;

var chart = createChart(container, {
    width: width,
    height: height,
    layout: {
        textColor: '#000',
        backgroundColor: '#fff',
    },
});

var areaSeries = chart.addAreaSeries({
    topColor: 'rgba(38, 198, 218, 0.56)',
    bottomColor: 'rgba(38, 198, 218, 0.04)',
    lineColor: 'rgba(38, 198, 218, 1)',
    lineWidth: 2,
    visible: true,
});

let dayData = [];
readRemoteFile("./1.csv", {
    header: true,
    download: true,
    complete: (results) => {
        results.data.map((dt) => {
            if (dt.time) {
                dayData.push({
                    time: dt.time,
                    value: parseFloat(dt.value),
                });
            }
        });
        areaSeries.setData(dayData);

        //START SMA
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
        //END SMA
    },
});

var smaData = calculateSMA(dayData);
var smaLine = chart.addAreaSeries();
smaLine.setData(smaData);

var smalegend = document.createElement('div');
smalegend.className = 'sma-legend';
container.appendChild(smalegend);


function setMAText(smaVal) {
    let val = 'n/a';
    if (smaVal !== undefined) {
        val = (Math.round(smaVal * 100) / 100).toFixed(2);
    }
    smalegend.innerHTML = 'MA7 <span style="color:rgba(38, 198, 218, 1)">' + val + '</span>';
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