import React from 'react';
import logo from './logo.svg';
import './App.css';
import {Socket} from "phoenix";

var sock = new Socket("ws://rog.home.tilmonedwards.com:4000/socket/user");
sock.connect();

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.js</code> and save to reload.
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          blahh
        </a>
      </header>
    </div>
  );
}

export default App;
