import Chart from './components/Chart';
import Stats from './components/PieStats';
import Trend from './components/Trend';
// import Redzone from './components/Redzone';
import Footer from './components/Footer';

function App() {
  return (
    <div className="App pt--40">
      <div className="container">
        <h1>Positivi Giornalieri a Bagheria</h1>
        <h2>Aggiornato al 19/03/2021</h2>
        <small>Fonte: ASP DISTRETTO 39</small>
        <Chart />
        <div className="container center">
          <div className="row">
            <Trend/>
            <Stats />
          </div>
        </div>
        <Footer />
      </div>
    </div>
  );
}

export default App;
