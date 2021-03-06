import React from 'react';
import ReactDOM from 'react-dom';
import 'react-quill/dist/quill.snow.css';
import 'animate.css';
import './styles/index.css';
import './styles/login_register.css';
import './styles/sidebar.css';
import './styles/dashboard_withtiles.css';
import './styles/calendar.css';
import './styles/articles.css';
import './styles/certstyle.css';
import App from './App';

import { BrowserRouter } from "react-router-dom";

ReactDOM.render(
  <React.StrictMode>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </React.StrictMode>,
  document.getElementById('root')
);
