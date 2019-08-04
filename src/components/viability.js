import React from 'react';
import {Form, Button, InputNumber} from 'antd';
import {Socket} from "phoenix";
import {calculateViabilityThreshold} from '../calculator.js';

export default class Viability extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
			viability: '',
			formLayout: 'horizontal',
			precinct_id: props.precinct_id
		};
    }
  
	handleSubmit = e => {
		e.preventDefault();

		// Fixes https://www.rockyourcode.com/assertion-failed-input-argument-is-not-an-html-input-element
		// which is caused by lastpass extension...
		e.stopPropagation();

		const totalAttendees = document.getElementById("num-attendees").value;

		//TODO: handle case where there is no precinct id in url
		const viability = calculateViabilityThreshold(totalAttendees,this.state.precinct_id);
		this.setState({viability});

		/*channel.push("new_msg", {body: viability}, 10000)
		.receive("ok", (msg) => console.log("created message", msg) )
		.receive("error", (reasons) => console.log("create failed", reasons) )
		.receive("timeout", () => console.log("Networking issue...") )*/
	}

  
    render () {
		const { formLayout } = this.state;
		const formItemLayout =
		formLayout === 'horizontal'
			? {
				//TODO: add proper css for mobile alignment
				labelCol: { span: 13 },
				wrapperCol: { span: 5 },
			}
			: null;
        return (
			<Form onSubmit={this.handleSubmit} className="viability-form">
				<Form.Item label="Total Attendees:" {...formItemLayout}>
					<InputNumber id="num-attendees" min={1} defaultValue={1} />
				</Form.Item>
				<Form.Item>
					<Button type="primary" htmlType="submit" className="form-submit">Calculate Viability</Button>
				</Form.Item>
				{this.state.viability ? (
					<p className="label-viability">{this.state.viability} attendees for viability.</p>
				) : null}
        	</Form>
      	)
    }
  }