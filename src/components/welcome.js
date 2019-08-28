import React from 'react';
import {NavBar, Button, InputItem, List} from 'antd-mobile';
import staticData from '../iowa.json';

export default class Welcome extends React.Component {

	constructor(props) {
    super(props);
    this.state = {
     code: null,
     error: false
    };
  }

  onChange = (code) => {
    this.setState({code});
  }

  verifyLogin() {
    if(Object.keys(staticData.precincts).includes(this.state.code)) {
      window.localStorage.setItem("precinct", this.state.code);
      this.props.connect(this.state.code);
      this.forceUpdate();
    } else {
      this.setState({error: true});
    }
  }
  
  goForward(path) {
    this.props.history.push(path);
  }
  
  // Few notes here: we'll have the date, time, and exact location in the json file when it's ready. The following is placeholder.
  // Right now this just takes a precinct id (see iowa.json for some precincts). We may decide it also needs to identify the users.
  // There's surely a better way to do this than two returns but this gets the idea across
	render () {
    if(window.localStorage.getItem("precinct")) {
      const precinct = parseInt(window.localStorage.getItem("precinct"));
      return (
        <div>
          <NavBar mode="light">Welcome!</NavBar>
          <p>Hey, Captain!</p>
          <p>The caucus in {staticData.precincts[precinct].van_prct_name}, {staticData.precincts[precinct].county} County, is on 02/03/20 at 6pm.</p>
          <Button type="primary" onClick={() => this.goForward("/checkin")}>Start the Caucus</Button>
          <Button type="default" onClick={() => this.goForward("/help")}>Get Help</Button>
        </div>
    );
    } else {
      return (
        <div>
          <NavBar mode="light">Three Tickets</NavBar>
          <p>{this.state.error ? "Invalid code. Please try again" : "Enter your captain code"}</p>
          <List>
          <InputItem
            type="password"
            placeholder="**********"
            clear="true"
            value={this.state.code}
            onChange={this.onChange}
          />
        </List>
          <Button type="primary" onClick={() => this.verifyLogin()}>Start</Button>
        </div>
      );
    }
  }
}
