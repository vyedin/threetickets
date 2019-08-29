import React from 'react';
import {NavBar, Icon, List, InputItem, Button} from 'antd-mobile';

export default class Checkin extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      totalAttendees: 0
    };
  }

  onChange = (totalAttendees) => {
    this.setState({totalAttendees});
  }

  goBack(){
    this.props.history.goBack();
  }

  goForward(path) {
    this.props.history.push(path);
  }

  handleCheckin(){
    this.props.channel.push("checkin", {
      attendees: this.state.totalAttendees
    });
    window.localStorage.setItem("totalAttendees", this.state.totalAttendees);
    this.goForward({pathname: "/delegates"});
  }

  render () {
    return (
      <div>
        <NavBar
          mode="light"
          icon={<Icon type="left" />}
          onLeftClick={() => this.goBack()}
        >Check-in</NavBar>
        <p>Let's start the check-in process. What is the official count of people at your caucus location today?</p>
        <List>
          <InputItem
            type="digit"
            clear="true"
            value={this.state.totalAttendees}
            onChange={this.onChange}
          />
        </List>
        <Button type="primary" onClick={() => this.handleCheckin()}>Submit Check-In</Button>
        <Button type="default" onClick={() => this.goForward("/help")}>Get Help</Button>
      </div>
    )
  }
}
