import React from 'react';
import {NavBar, Button, Icon, List} from 'antd-mobile';
import staticData from '../iowa.json';

const Item = List.Item;

export default class Help extends React.Component {

  constructor(props) {
    super(props);
    this.state = {};
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
        <List>
          {staticData.problems.map((problem,k) => {
            return (  
              <Item
                key={k}
                arrow="horizontal"
                multipleLine
                onClick={() => this.goForward({pathname: "/message", state: {problem: problem}})} 
                platform="android"
              >{problem.description}</Item>
            )
          })}
        </List>
        <Button type="primary" href="tel:+1-408-832-3962">Call for Help</Button>
      </div>
    )
  }
}