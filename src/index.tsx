import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import './styles.scss';
import comuni from './data/comuni.json';
import { Menu } from './components/layout/Menu';
import { Dashboard } from './components/Dashboard';

const App = () => {
  return (
    <div className="App">
      <Router>
        <Menu data={comuni} />
        <Routes>
          <Route path="/" element={<Dashboard comune={comuni[0]} />} />
          {comuni.map((comune, i) => (
            <Route
              key={i + 1}
              path={`/${comune.path}`}
              element={<Dashboard comune={comune} />}
            />
          ))}
        </Routes>
      </Router>
    </div>
  );
};

ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById('root')
);
