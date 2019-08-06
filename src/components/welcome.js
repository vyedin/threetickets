import React from 'react';
import {PageHeader, Button} from 'antd';
import {HashRouter as Redirect} from 'react-router-dom'
import staticData from '../iowa.json';

export default class Welcome extends React.Component {

	constructor(props) {
    super(props);
		this.state = {
      precinct_id: props.precinct_id
		};
  }
  
  goForward(path) {
    this.props.history.push(path);
  }

	render () {
	  return (
      <div>
        <PageHeader onBack={() => null} title="Welcome" />
        <p>Hey, Captain!</p>
        <p>The caucus in {staticData.precincts[this.state.precinct_id].van_prct_name}, {staticData.precincts[this.state.precinct_id].county} County, is on 02/03/20 at 6pm.</p>
        <p><Button type="primary" className="form-submit" onClick={() => this.goForward("/viability")}>Start the Caucus</Button></p>
        <p><Button type="primary" className="form-submit" onClick={() => this.goForward("/delegates")}>Get Help</Button></p>
      </div>
	  )
	}
}