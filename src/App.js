import { readRemoteFile } from "react-papaparse";
import { createChart } from "lightweight-charts";

var chart = createChart(document.body, {
  width: 1024, 
  height: 300,
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
  },
});

document.body.style.position = 'relative';

var legend = document.createElement('div');
legend.classList.add('legend');
document.body.appendChild(legend);

var firstRow = document.createElement('div');
firstRow.innerText = 'BAGHERIA';
firstRow.style.color = 'black';
legend.appendChild(firstRow);

chart.subscribeCrosshairMove((param) => {
	if (param.time) {
		const price = param.seriesPrices.get(areaSeries);
		firstRow.innerText = 'BAGHERIA' + '  ' + price.toFixed(2);
	}
  else {
  	firstRow.innerText = 'BAGHERIA';
  }
});

function App() {
  return (
    <div className="App">
      <div className="container">
        <h1>Positivi Giornalieri a Bagheria</h1>
        <h2>Aggiornato al 16/03/2021</h2>
        <div className="footer">
          <p>Made with ❤️ by <a href="https://www.totel.it" target="_blank" rel="noopener noreferrer">Totel Media</a></p>
        </div>
      </div>
    </div>
  );
}

export default App;
