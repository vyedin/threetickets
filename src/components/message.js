import React from 'react';
import {NavBar, Button, Icon,TextareaItem} from 'antd-mobile';

//TODO: This should probably be the same component as Help
export default class Message extends React.Component {

  constructor(props) {
    super(props);
    this.problem = this.props.location.state.problem;
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
        <NavBar
          mode="light"
          icon={<Icon type="left" />}
          onLeftClick={() => this.goBack()}
        >Help</NavBar>
        <p>Problem: {this.problem.description}</p>
        <TextareaItem
          rows={5}
          count={500}
          placeholder="Type your message..."
        />
        <Button type="primary" onClick={() => this.goForward("/help")}>Send Message</Button>
      </div>
    )
  }
}