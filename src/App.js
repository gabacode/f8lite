import { BrowserRouter as Router, Route } from 'react-router-dom';
import Dashboard from './components/Dashboard';

//TODO menus
const bagheria = ["Bagheria","bagheria",53714];
const sflavia = ["Santa Flavia","santaflavia",11026]
const ficarazzi = ["Ficarazzi","ficarazzi",12604]
const casteldaccia = ["Casteldaccia","casteldaccia",11384]
const altavilla = ["Altavilla Milicia","altavilla",8342]

export default function App() {
  return (
    <div className='App'>
      <Router>
        <Route exact path="/" render={(props) => <Dashboard {...props} cityName={bagheria[0]} scope={bagheria[1]} pop={bagheria[2]} />} />
        <Route exact path="/bagheria" render={(props) => <Dashboard {...props} cityName={bagheria[0]} scope={bagheria[1]} pop={bagheria[2]} />} />
        <Route exact path="/santaflavia" render={(props) => <Dashboard {...props} cityName={sflavia[0]} scope={sflavia[1]} pop={sflavia[2]} />} />
        <Route exact path="/ficarazzi" render={(props) => <Dashboard {...props} cityName={ficarazzi[0]} scope={ficarazzi[1]} pop={ficarazzi[2]} />} />
        <Route exact path="/casteldaccia" render={(props) => <Dashboard {...props} cityName={casteldaccia[0]} scope={casteldaccia[1]} pop={casteldaccia[2]} />} />
        <Route exact path="/altavilla" render={(props) => <Dashboard {...props} cityName={altavilla[0]} scope={altavilla[1]} pop={altavilla[2]} />} />
      </Router>
    </div>
  );
}