import React from 'react';
import {InputItem} from 'antd-mobile';

export default class Candidate extends React.Component {

  constructor(props) {
    super(props);
    this.name = this.props.name
  }

  onChange = (caucusers) => {
    this.props.delegatesCallback(parseInt(caucusers) || 0);
  }

  render () {
    return (
      <div>
        <InputItem
          type="digit"
          defaultValue="0"
          extra={this.props.delegates}
          value={this.props.caucusers}
          onChange={this.onChange}
        >{this.name}</InputItem>
      </div>
    )
  }
}