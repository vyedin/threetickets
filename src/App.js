import React from 'react';
import './App.css';
import {HashRouter as Router, Route} from 'react-router-dom'
import Welcome from './components/welcome';
import Viability from './components/viability';
import Delegates from './components/delegates';
<<<<<<< HEAD
import socket from './socket';
=======
import Help from './components/help';
>>>>>>> keep adding routing, and add help page

/*const sock = new Socket("ws://rog.home.tilmonedwards.com:4000/socket/user");
sock.connect();

let channel = sock.channel("caucus:iowa")
channel.on("new_msg", msg => console.log("Got message", msg) )

channel.join()
  .receive("ok", ({messages}) => console.log("catching up", messages) )
  .receive("error", ({reason}) => console.log("failed join", reason) )
  .receive("timeout", () => console.log("Networking issue. Still waiting..."))*/

const precinct_id = new URL(window.location.href).searchParams.get("precinct_id");


let channel = socket.channel("caucus:" + precinct_id)
channel.join()

function App() {
  return (
    <Router>
      <div className="App">
        <Route exact path="/" render={(props) => <Welcome {...props} precinct_id={precinct_id} channel={channel} />} />
        <Route path="/viability" render={(props) => <Viability {...props} precinct_id={precinct_id} channel={channel} />} />
        <Route path="/delegates" render={(props) => <Delegates {...props} channel={channel} />} />
        <Route path="/help" render={(props) => <Help {...props} precinct_id={precinct_id} channel={channel} />} />
      </div>
    </Router>
  );
}

export default App;
