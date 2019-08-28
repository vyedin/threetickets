import React from 'react';
import 'antd-mobile/dist/antd-mobile.css';
import {HashRouter as Router, Route} from 'react-router-dom' //https://ayastreb.me/react-router-in-home-screen-pwa/
import socket from './socket';

import Welcome from './components/welcome';
import Checkin from './components/checkin';
import Delegates from './components/delegates';
import Help from './components/help';
import Message from './components/message';

let channel = null;
function join(precinctId) {
  if (channel) { channel.leave(); }
  channel = socket.channel("caucus:" + precinctId);
  channel.join();
  return channel;
}

let precinctId = window.localStorage.getItem("precinct");
if (precinctId) {
  join(precinctId);
}

function App() {
  return (
    <Router>
      <div className="App">
        <Route exact path="/" render={(props) => <Welcome {...props} connect={join} />} />
        <Route path="/checkin" render={(props) => <Checkin {...props} channel={channel} />} />
        <Route path="/delegates" render={(props) => <Delegates {...props} channel={channel} />} />
        <Route path="/help" render={(props) => <Help {...props} channel={channel} />} />
        <Route path="/message" render={(props) => <Message {...props} channel={channel} />} />
      </div>
    </Router>
  );
}

export default App;
