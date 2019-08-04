// DISPLAYS A LIST OF CANDIDATES AND THEIR DELEGATE COUNT

import React from 'react';
import Candidate from './candidate';

export default class Delegates extends React.Component {

	constructor(props) {
        super(props);
        this.output = this.output.bind(this);
		this.state = {
            delegates: 0
		};
    }
  
	setDelegates (candidate, delegates) {
		const attendees = document.getElementById("num-attendees-per-candidate").value;
		this.setState({candidate, delegates});
	}
  
    output(evt) {
        console.log("Data sent to child");
        this.setState({delegates: this.state.delegates + evt});
    }
	render () {
	  return (
        <div>
            <p>Delegates: {this.state.delegates}</p>
            <Candidate func={this.output} /> 
        </div>
	  )
	}
  }