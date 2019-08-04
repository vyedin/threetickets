import React from 'react';
import {InputNumber} from 'antd';

export default class Candidate extends React.Component {

	constructor(props) {
		super(props);
		this.state = {
		};
	}

	render () {
	  return (
		<div className="calculate-delegates-per-candidate">
			<p>"Elizabeth Warren"</p>
			<InputNumber id="num-attendees-per-candidate" min={0} defaultValue={0} onChange={(evt) => this.props.func(Math.random())}/>
			<p className="label-delegates">10 delegates</p>
		</div>
	  )
	}
  }