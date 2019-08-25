import React from 'react';
import {NavBar, Button} from 'antd-mobile';
import staticData from '../iowa.json';

export default class Welcome extends React.Component {

	constructor(props) {
    super(props);
    this.precinct_id = props.precinct_id;
  }
  
  goForward(path) {
    this.props.history.push(path);
  }
  
  // Few notes here: we'll have the date, time, and exact location in the json file when it's ready. The following is placeholder.
	render () {
	  return (
      <div>
        <NavBar mode="light">Welcome!</NavBar>
        <p>Hey, Captain!</p>
        <p>The caucus in {staticData.precincts[this.precinct_id].van_prct_name}, {staticData.precincts[this.precinct_id].county} County, is on 02/03/20 at 6pm.</p>
        <Button type="primary" onClick={() => this.goForward("/checkin")}>Start the Caucus</Button>
        <Button type="default" onClick={() => this.goForward("/help")}>Get Help</Button>
      </div>
	  )
	}
}