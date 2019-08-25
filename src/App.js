import React from 'react';
import 'antd-mobile/dist/antd-mobile.css';
import {HashRouter as Router, Route} from 'react-router-dom' //https://ayastreb.me/react-router-in-home-screen-pwa/
import socket from './socket';

import Welcome from './components/welcome';
import Checkin from './components/checkin';
import Delegates from './components/delegates';
import Help from './components/help';
import Message from './components/message';

//prompt user for is, store in local storage, and re-render component and initialize the state off local storage
const precinct_id = new URL(window.location.href).searchParams.get("precinct_id");

let channel = socket.channel("caucus:" + precinct_id);
channel.join();

function App() {
  return (
    <Router>
      <div className="App">
        <Route exact path="/" render={(props) => <Welcome {...props} precinct_id={precinct_id} channel={channel} />} />
        <Route path="/checkin" render={(props) => <Checkin {...props} precinct_id={precinct_id} channel={channel} />} />
        <Route path="/delegates" render={(props) => <Delegates {...props} precinct_id={precinct_id} channel={channel} />} />
        <Route path="/help" render={(props) => <Help {...props} precinct_id={precinct_id} channel={channel} />} />
        <Route path="/message" render={(props) => <Message {...props} precinct_id={precinct_id} channel={channel} />} />
      </div>
    </Router>
  );
}

export default App;
