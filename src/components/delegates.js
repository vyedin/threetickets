import React from 'react';
import Candidate from './candidate';
import {NavBar, Icon, List, Button} from 'antd-mobile';
import staticData from '../iowa.json';
import {calculateViabilityThreshold, calculateDelegates, resolveDelegates} from '../calculator.js';

const candidateIds = Object.keys(staticData.candidates);

export default class Delegates extends React.Component {

	constructor(props) {
    super(props);
    const candidates = {};
    candidateIds.forEach((candidateId) => {
      candidates[candidateId] = {caucusers: 0, delegates: 0};
    });
    this.state = {
      candidates
    };

    // These don't change:
    this.totalDelegates = staticData.precincts[this.props.precinct_id].delegates;
    this.totalAttendees = parseInt(window.localStorage.getItem("totalAttendees"));
    this.viabilityThreshold = (this.totalDelegates > 1) ? calculateViabilityThreshold(this.totalAttendees, this.totalDelegates) : "simple majority";
  }

  // all purpose function to sum values for all candidates
  getCount(candidates, field) {
    let count = 0;
    candidateIds.forEach((candidateId) => {
      count += candidates[candidateId][field];
    });
    return count;
  }

  delegatesCallback(candidateId) {
    return function(caucusers) {
      // We can save some calculations since we know candidates below viability threshold will have 0 delegates
      const delegates = (caucusers >= this.viabilityThreshold) ? calculateDelegates(this.totalAttendees, this.totalDelegates, caucusers) : 0;
      let candidates = this.state.candidates;
      candidates[candidateId] = {caucusers, delegates};
      
      // EDGE CASES (TM):
      // - NO VIABLE CANDIDATES: the smallest groups realign until there are viable candidates. These instructions will be given, 
      //   the app isn't able to help too much here.
      // - SOME VIABLE CANDIDATES BUT NOT ALL DELEGATES ALLOCATED: will check but likely a variation of the above
      // - TOO MANY DELEGATES ALLOCATED: a few things can happen depending on the situation and they are all bad. 
      //   These are outlined in `resolveDelegates` below.
      if (this.getCount(candidates, "delegates") > this.totalDelegates) {
        candidates = resolveDelegates(candidates, this.totalDelegates);
      }
      this.setState({candidates});
    }.bind(this);
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
        <p>{this.totalDelegates} delegates | {this.viabilityThreshold} for viability | {this.getCount(this.state.candidates, "caucusers")}/{this.totalAttendees} pledged</p>
        <List>
          {candidateIds.map((candidateId) => {
            const candidate = staticData.candidates[candidateId];
            const candidateData = this.state.candidates[candidateId];
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
