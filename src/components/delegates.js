import React from 'react';
import Candidate from './candidate';
import {NavBar, Icon, List, Button} from 'antd-mobile';
import staticData from '../iowa.json';
import {calculateViabilityThreshold, calculateDelegates, resolveDelegates, calculateSimpleMajority} from '../calculator.js';
import {reduce, each} from 'underscore';

const candidateIds = Object.keys(staticData.candidates);

export default class Delegates extends React.Component {

	constructor(props) {
    super(props);
    const candidates = {};
    candidateIds.forEach((candidateId) => {
      candidates[candidateId] = {candidateId, caucusers: 0, delegates: 0};
    });
    this.state = {
      candidates,
      countedCaucusers: 0,
      pledgedDelegates: 0
    };

    // These don't change:
    this.precinct = parseInt(window.localStorage.getItem("precinct"));
    this.totalDelegates = staticData.precincts[this.precinct].delegates;
    this.totalAttendees = parseInt(window.localStorage.getItem("totalAttendees"));
    this.viabilityThreshold = calculateViabilityThreshold(this.totalAttendees, this.totalDelegates);
  }

  delegatesCallback(candidateId) {
    return function(caucusers) {
      let candidates = this.state.candidates;
      candidates[candidateId].caucusers = caucusers;
      // recalculate delegates for every candidate now that there's been a change
      each(candidates, function(candidate) { candidate.delegates = calculateDelegates(this.totalAttendees, this.totalDelegates, candidate.caucusers)}.bind(this));

      // Special case for situations decided by simple majority (ex one-delegate precincts)
      if (this.viabilityThreshold === 0) {
        candidates = calculateSimpleMajority(candidates, this.totalDelegates);
      }
      
      // EDGE CASES (TM):
      // - NO OR NOT ENOUGH VIABLE CANDIDATES: the smallest groups realign until there are viable candidates. These instructions will be given, 
      //   the app isn't able to help too much here.
      // - TIE OR TOO MANY DELEGATES ALLOCATED: a few things can happen depending on the situation. These are outlined in `resolveDelegates` below.
      
      if (reduce(candidates, function(memo, candidate) { return memo + candidate.delegates}, 0) > this.totalDelegates) {
        candidates = resolveDelegates(candidates, this.totalDelegates);
      }
      this.setState({
        candidates, 
        countedCaucusers: reduce(candidates, function(memo, candidate) { return memo + candidate.caucusers}, 0),
        pledgedDelegates: reduce(candidates, function(memo, candidate) { return memo + candidate.delegates}, 0)
      });
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
        <p>{this.state.pledgedDelegates}/{this.totalDelegates} delegates | 
        {(this.totalDelegates > 1) ? this.viabilityThreshold : "simple majority"} for viability | 
        {this.state.countedCaucusers}/{this.totalAttendees} pledged</p>
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
