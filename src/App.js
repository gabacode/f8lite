import { BrowserRouter as Router, Route } from 'react-router-dom';
import Menu from './components/Menu';
import Dashboard from './components/Dashboard';

const bagheria = ["Bagheria","bagheria",53149];
const sflavia = ["Santa Flavia","santa_flavia",10952]
const ficarazzi = ["Ficarazzi","ficarazzi",12763]
const casteldaccia = ["Casteldaccia","casteldaccia",11543]
const altavilla = ["Altavilla Milicia","altavilla_milicia",8452]

export default function App() {
  return (
    <div className='App'>
      <Router>
        <Menu/>
        <Route exact path="/" render={(props) => <Dashboard {...props} cityName={bagheria[0]} scope={bagheria[1]} pop={bagheria[2]} istat={82006} />} />
        <Route exact path="/bagheria" render={(props) => <Dashboard {...props} cityName={bagheria[0]} scope={bagheria[1]} pop={bagheria[2]} istat={82006} />} />
        <Route exact path="/santaflavia" render={(props) => <Dashboard {...props} cityName={sflavia[0]} scope={sflavia[1]} pop={sflavia[2]} istat={82067} />} />
        <Route exact path="/ficarazzi" render={(props) => <Dashboard {...props} cityName={ficarazzi[0]} scope={ficarazzi[1]} pop={ficarazzi[2]} istat={82035} />} />
        <Route exact path="/casteldaccia" render={(props) => <Dashboard {...props} cityName={casteldaccia[0]} scope={casteldaccia[1]} pop={casteldaccia[2]} istat={82023} />} />
        <Route exact path="/altavilla" render={(props) => <Dashboard {...props} cityName={altavilla[0]} scope={altavilla[1]} pop={altavilla[2]} istat={82004} />} />
      </Router>
    </div>
  );
}
