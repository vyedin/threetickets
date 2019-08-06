import React from 'react';
import './App.css';
import {Socket} from "phoenix";
import {HashRouter as Router, Route} from 'react-router-dom'
import Welcome from './components/welcome';
import Viability from './components/viability';
import Delegates from './components/delegates';

/*const sock = new Socket("ws://rog.home.tilmonedwards.com:4000/socket/user");
sock.connect();

let channel = sock.channel("caucus:iowa")
channel.on("new_msg", msg => console.log("Got message", msg) )

channel.join()
  .receive("ok", ({messages}) => console.log("catching up", messages) )
  .receive("error", ({reason}) => console.log("failed join", reason) )
  .receive("timeout", () => console.log("Networking issue. Still waiting..."))*/

const precinct_id = new URL(window.location.href).searchParams.get("precinct_id");

function App() {
  return (
    <Router>
      <div className="App">
        <Route exact path="/" render={(props) => <Welcome {...props} precinct_id={precinct_id} />} />
        <Route path="/viability" render={(props) => <Viability {...props} precinct_id={precinct_id} />} />
        <Route path="/delegates" component={Delegates} />
      </div>
    </Router>
  );
}

export default App;
