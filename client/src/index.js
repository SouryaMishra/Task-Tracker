import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';

document.addEventListener("mousedown", function(e){
  document.querySelectorAll(".show-menu").forEach(el => el.classList.remove("show-menu"));
  document.querySelectorAll(".btn-options").forEach(el => el.classList.remove("active"));
})

ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById('root')
);
