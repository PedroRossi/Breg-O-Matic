import React, { Component } from 'react';

import '../../styles/main.css';

class Block extends Component {

  constructor(props) {
    super(props);
    this.state = {current: -1};
  }

  increment() {
    this.setState({
      current: ((this.state.current+1)<this.props.max ? (this.state.current+1):(-1))
    });
  }

  render() {
    return (
      <div className="block block-round" onClick={this.increment()}>
        <p className="text-center">
          {this.state.current}
        </p>
      </div>
    );
  }

}

export default Block;
