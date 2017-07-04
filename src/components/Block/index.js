import React, { Component } from 'react';

import '../../styles/main.css';

class Block extends Component {

  constructor(props) {
    super(props);
    this.state = {current: -1, bgOn: false};
    this.bgToogle = this.bgToogle.bind(this);
    this.props.instrument.blocks[Number(this.props.index)]=this;
  }

  increment() {
    let current = ((this.state.current+1)<this.props.instrument.samples.length ? (this.state.current+1):(-1))
    this.setState({
      current: current,
      bgOn: (current!==-1)
    });
    let i=1;
    let index = Number(this.props.index);
    for (;current!==-1&&i<this.props.instrument.samples[current].tempo&&(index+i)<this.props.instrument.blocks.length;++i)
      this.props.instrument.blocks[index+i].bgToogle(true);
    for (;i<4&&(index+i)<this.props.instrument.blocks.length;++i)
      if (this.props.instrument.blocks[index+i].state.current===-1)
        this.props.instrument.blocks[index+i].bgToogle(false);
  }

  bgToogle(status) {
    this.setState({
      bgOn: status
    });
  }

  render() {
    return (
      <div className={"col-md-4 block block-round"+(this.state.bgOn?" bg":"")} onClick={e => this.increment(e)}>
        <p>
          {this.state.current!==-1?this.state.current:""}
        </p>
      </div>
    );
  }

}

export default Block;
