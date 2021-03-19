import Chart from './components/Chart';
import Trend from './components/Trend';
// import Redzone from './components/Redzone';
import Footer from './components/Footer';

function App() {
  return (
    <div className="App pt--40">
      <div className="container">
        <h1>Positivi Giornalieri a Bagheria</h1>
        <h2>Aggiornato al 17/03/2021</h2>
        <Chart />
        <Trend/>
        <Footer />
      </div>
    </div>
  );
}

export default App;
