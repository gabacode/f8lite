import React from 'react';
import ReactDOM from 'react-dom';
import './styles.scss';

import { BrowserRouter as Router, Routes, Route} from "react-router-dom";
import Menu from './components/Menu';
import comuni from './data/comuni.json'
import Dashboard from './components/Dashboard';

const App = () => {
  return (
    <div className='App'>
      <Router>
        <Menu data={comuni} />
        <Routes>
          <Route exact path="/" element={<Dashboard data={comuni[0]} />} />
          {comuni.map((comune, i) => <Route key={i+1} exact path={`/${comune.path}`} element={<Dashboard data={comune} />} />)}
        </Routes>
      </Router>
    </div>
  );
}

ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById('root')
);
