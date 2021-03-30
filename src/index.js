import React from 'react';
import ReactDOM from 'react-dom';
import './styles.scss';
import Dashboard from './components/Dashboard';

//TODO menus
const bagheria = ["Bagheria","bagheria",53714];
// const sflavia = ["Santa Flavia","santaflavia",11026]
// const ficarazzi = ["Ficarazzi","ficarazzi",12604]
// const casteldaccia = ["Casteldaccia","casteldaccia",11384]
// const altavilla = ["Altavilla Milicia","altavilla",8342]

ReactDOM.render(
  <React.StrictMode>
    <Dashboard cityName={bagheria[0]} scope={bagheria[1]} pop={bagheria[2]}/>
  </React.StrictMode>,
  document.getElementById('root')
);
