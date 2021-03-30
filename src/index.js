import React from 'react';
import ReactDOM from 'react-dom';
import './styles.scss';
import Menu from './components/Menu';
import App from './App';

ReactDOM.render(
  <React.StrictMode>
    <Menu />
    <App />
  </React.StrictMode>,
  document.getElementById('root')
);
