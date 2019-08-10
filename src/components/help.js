import React from 'react';
import {PageHeader, Button, List, Typography} from 'antd';

const helpOptions = [
  "I can\'t find my location",
  "Location is locked",
  "Temporary chair not here",
  "Temporary chair not prepared",
  "Caucus starting late",
  "Other issue"
];

export default class Help extends React.Component {

	constructor(props) {
    super(props);
    this.goBack = this.goBack.bind(this);
	  this.state = {
      precinct_id: props.precinct_id
	  };
  }

  goBack(){
    this.props.history.goBack();
  }
  
  goForward(path) {
    this.props.history.push(path);
  }

	render () {
	  return (
      <div>
        <PageHeader onBack={this.goBack} title="Help" />
        <List
          size="large"
          bordered
          dataSource={helpOptions}
          renderItem={item => <List.Item>{item}</List.Item>}
        />
        <p><Button type="primary" className="form-submit" href="tel:+1-408-832-3962">Call for Help</Button></p>
      </div>
	  )
	}
}