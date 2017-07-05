import React, { Component } from 'react';

import HeaderBlock from '../HeaderBlock';
import Block from '../Block';

import '../../styles/row.css';

export default class Row extends Component{
  constructor(props) {
    super(props);
    this.tracksCount = props.instrument.bufferArray.length;
    var columns = [];
    for(var i = 0; i < props.columns; ++i)
      columns.push({track: -1, color: false});
    this.state = {
      columns: columns
    }
  }

  updateColor(array) {
    var last = -1, at;
    for(var i = 0; i < this.props.columns; ++i) {
      if(array[i].track !== -1) {
        at = i;
        last = array[i].track;
      }
      array[i].color = last !== -1 && i < at + Math.floor(this.props.instrument.bufferArray[last].length/this.props.blockDuration);
      console.log(last, at, array[i], i)
    }
    return array
  }

  _onClick(idx) {
    var arr = this.state.columns.slice();
    arr[idx].track += 1;
    if(arr[idx].track >= this.tracksCount) {
      arr[idx].track = -1;
      this.props.player.removeTrack(idx*this.props.blockDuration, this.props.instrument.key);
    } else
      this.props.player.addTrack(idx*this.props.blockDuration, this.props.instrument.key, this.props.instrument.bufferArray[arr[idx].track]);
    arr = this.updateColor(arr);
    console.log(arr)
    this.setState({
      columns: arr
    });
  }

  render() {
    return (
      <tr>
        <HeaderBlock src={this.props.instrument.icon} />
        {this.state.columns.map((val, idx) => {
          return <Block key={idx} track={val.track} color={val.color} onClick={this._onClick.bind(this, idx)} />;
        })}
      </tr>
    )
  }
}
