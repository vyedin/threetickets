import React from 'react';
import Candidate from './candidate';
import {NavBar, Icon, List, Button} from 'antd-mobile';
import staticData from '../iowa.json';
import {calculateViabilityThreshold, calculateDelegates} from '../calculator.js';

const candidateIds = Object.keys(staticData.candidates);

export default class Delegates extends React.Component {

	constructor(props) {
    super(props);
    this.state = {
      allocatedDelegates: 0
    };
    candidateIds.forEach((candidateId) => {
      this.state[candidateId] = {caucusers: 0, delegates: 0};
    });

    // These don't change:
    this.totalDelegates = staticData.precincts[this.props.precinct_id].delegates;
    this.totalAttendees = parseInt(window.localStorage.getItem("totalAttendees"));
    this.viabilityThreshold = calculateViabilityThreshold(this.totalAttendees, this.totalDelegates)
  }

  delegatesCallback(candidateId) {
    return function(caucusers) {
      const delegates =  (caucusers >= this.viabilityThreshold) ? calculateDelegates(this.totalAttendees, this.totalDelegates, caucusers) : 0;
      this.setState({[candidateId]: {caucusers, delegates}})
    }.bind(this);
  }

  getAttendeesCount() {
    let count = 0;
    candidateIds.forEach((candidateId) => {
      count += this.state[candidateId].caucusers;
    });
    return count;
  }

  goBack(){
    this.props.history.goBack();
  }

  goForward(path) {
    this.props.history.push(path);
  }

  submitAlignment() {
    this.props.channel.push("alignment", this.state);
  }

  render () {
	  return (
      <div>
        <NavBar
          mode="light"
          icon={<Icon type="left" />}
          onLeftClick={() => this.goBack()}
        >Alignment</NavBar>
        <p>{this.totalDelegates} delegates | {this.viabilityThreshold} for viability | {this.getAttendeesCount()}/{this.totalAttendees} pledged</p>
        <List>
          {candidateIds.map((candidateId) => {
            const candidate = staticData.candidates[candidateId];
            const candidateData = this.state[candidateId];
            return (  
              <Candidate
                key={candidateId}
                name={candidate.name}
                caucusers={candidateData.caucusers}
                delegates={candidateData.delegates}
                delegatesCallback={this.delegatesCallback(candidateId)}
              />
            )
          })}
        </List>
        <Button type="primary" onClick={() => this.submitAlignment()}>Submit Alignment</Button>
        <Button type="default" onClick={() => this.goForward("/help")}>Get Help</Button>
      </div>
	  )
	}
}
