import React, { Component } from 'react'
import Block from '../Block'
import '../../styles/row.css'

export default class Row extends Component {

  constructor(props) {
    super(props);
    this.tracksCount = props.instrument.bufferArray.length
    let columns = []
    for(let i = 0; i < props.columns; ++i)
      columns.push({track: -1, color: false})
    this.state = {
      columns: columns
    }
  }

  updateColor(array) {
    let last = -1, at
    for(let i = 0; i < this.props.columns; ++i) {
      if(array[i].track !== -1) {
        at = i
        last = array[i].track
      }
      array[i].color = last !== -1 && i < at + Math.floor(this.props.instrument.bufferArray[last].length/this.props.blockDuration)
    }
    return array
  }

  _onClick(idx) {
    let arr = this.state.columns.slice()
    arr[idx].track += 1
    if(arr[idx].track >= this.tracksCount) {
      arr[idx].track = -1
      this.props.player.removeTrack(idx*this.props.blockDuration, this.props.instrument.key)
    } else {
      this.props.player.addTrack(idx*this.props.blockDuration, this.props.instrument.key, this.props.instrument.bufferArray[arr[idx].track])
    }
    arr = this.updateColor(arr)
    this.setState({
      columns: arr
    });
  }

  render() {
    let row = 1
    switch (this.props.instrument.key) {
      case 'bass':
        row = 1
      break;
      case 'keyboard':
        row = 3
      break;
      case 'drums':
        row = 2
      break;
      default:
    }

    const style = {
      gridColumnStart: 1,
      gridRowStart: row,
      display: 'grid',
      gridTemplateColumns: `repeat(${this.state.columns.length}, 100px)`,
    }

    return (
      <div style={style} id="row">
        {this.state.columns.map((val, idx) => 
          <Block key={idx} track={val.track} color={val.color} onClick={this._onClick.bind(this, idx)} />
        )}
      </div>
    )
  }
}

