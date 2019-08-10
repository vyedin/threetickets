import React from 'react';
import Candidate from './candidate';
import {PageHeader} from 'antd';

export default class Delegates extends React.Component {

	constructor(props) {
    super(props);
    this.output = this.output.bind(this);
    this.goBack = this.goBack.bind(this);
		this.state = {
      delegates: 0
		};
    this.channel = props.channel;
  }

  goBack(){
    this.props.history.goBack();
  }

  goForward(path) {
    this.props.history.push(path);
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
        <PageHeader onBack={this.goBack} title="Align" />
        <p>Delegates: {this.state.delegates}</p>
        <Candidate func={this.output} /> 
      </div>
	  )
	}
}
