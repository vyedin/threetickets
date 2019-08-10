import React from 'react';
import {PageHeader, Form, Button, InputNumber} from 'antd';
import {calculateViabilityThreshold} from '../calculator.js';
import Welcome from './welcome.js';

export default class Viability extends React.Component {

  constructor(props) {
    super(props);
    this.goBack = this.goBack.bind(this);
    this.state = {
      viability: '',
      formLayout: 'horizontal',
      precinct_id: props.precinct_id
    };
    this.channel = props.channel;
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

    this.channel.push("checkin", {
      attendees: totalAttendees
    });

    this.goForward("/delegates");
  }
  
  goBack(){
    this.props.history.goBack();
  }

  goForward(path) {
    this.props.history.push(path);
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
      <div>
        <PageHeader onBack={this.goBack} title="Check In" />
        <Form onSubmit={this.handleSubmit} className="viability-form">
          <Form.Item label="Total Attendees:" {...formItemLayout}>
            <InputNumber id="num-attendees" min={1} defaultValue={1} />
          </Form.Item>
          <Form.Item>
            <Button type="primary" htmlType="submit" className="form-submit" onClick={this.handleSubmit}>Submit Check-In</Button>
          </Form.Item>
            <Button type="primary" className="form-submit" onClick={() => this.goForward("/help")}>Get Help</Button>
        </Form>
      </div>
    )
  }
}
