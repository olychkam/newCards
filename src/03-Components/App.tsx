import React from 'react';
import { HashRouter } from 'react-router-dom';
import './App.css';
import Header from "./Header/Header";
import Routes from './Routes';


function App() {
  return (
    <div>
        <HashRouter>
            <Header />
                <Routes />
        </HashRouter>
    </div>
  );
}

export default App;
