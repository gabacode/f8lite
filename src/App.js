import './App.css';
import { readRemoteFile } from 'react-papaparse'
import { createChart } from 'lightweight-charts';

const chart = createChart(document.body, { width: 400, height: 300 });
const lineSeries = chart.addLineSeries();

readRemoteFile('./1.csv', {
  header: true,
  download: true,
  complete: (results) => {
    console.log(results);    
    
    lineSeries.setData([
      { time: '2019-04-11', value: 80.01 },
      { time: '2019-04-12', value: 96.63 },
      { time: '2019-04-13', value: 76.64 },
    ])
  
  }
});

function App() {
  return (
    <div className="App">
      <h1>DATA</h1>
    </div>
  );
}

export default App;
