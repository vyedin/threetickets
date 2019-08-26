import React from 'react';
import Candidate from './candidate';
import {NavBar, Icon, List, Button} from 'antd-mobile';
import staticData from '../iowa.json';
import {calculateViabilityThreshold, calculateDelegates, resolveDelegates, calculateSimpleMajority} from '../calculator.js';

const candidateIds = Object.keys(staticData.candidates);

export default class Delegates extends React.Component {

	constructor(props) {
    super(props);
    const candidates = {};
    candidateIds.forEach((candidateId) => {
      candidates[candidateId] = {candidateId, caucusers: 0, delegates: 0};
    });
    this.state = {
      candidates
    };

    // These don't change:
    this.precinct = parseInt(window.localStorage.getItem("precinct"));
    this.totalDelegates = staticData.precincts[this.precinct].delegates;
    this.totalAttendees = parseInt(window.localStorage.getItem("totalAttendees"));
    this.viabilityThreshold = calculateViabilityThreshold(this.totalAttendees, this.totalDelegates);
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
      let candidates = this.state.candidates;
      
      const delegates = calculateDelegates(this.totalAttendees, this.totalDelegates, caucusers);
      candidates[candidateId] = {candidateId, caucusers, delegates};

      // Special case for situations decided by simple majority (ex one-delegate precincts)
      if (this.viabilityThreshold === 0) {
        candidates = calculateSimpleMajority(candidates, this.totalDelegates);
      }
      
      // EDGE CASES (TM):
      // - NO OR NOT ENOUGH VIABLE CANDIDATES: the smallest groups realign until there are viable candidates. These instructions will be given, 
      //   the app isn't able to help too much here.
      // - TIE OR TOO MANY DELEGATES ALLOCATED: a few things can happen depending on the situation. These are outlined in `resolveDelegates` below.
      
      while (this.getCount(candidates, "delegates") > this.totalDelegates) {
        candidates = resolveDelegates(candidates);
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
        <p>{this.getCount(this.state.candidates, "delegates")}/{this.totalDelegates} delegates | 
        {(this.totalDelegates > 1) ? this.viabilityThreshold : "simple majority"} for viability | 
        {this.getCount(this.state.candidates, "caucusers")}/{this.totalAttendees} pledged</p>
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
