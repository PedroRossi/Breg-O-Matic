import React, { Component } from 'react'
import '../../styles/block.css';

export default class Block extends Component {
  _onClick() {
    if(this.props.onClick)
      this.props.onClick();
  }

  trackToText() {
    if(this.props.track === -1) return '-';
    return '' + this.props.track;
  }

  render() {
    return (
      <td style={{backgroundColor: (this.props.color ? 'rgb(238, 195, 204)' : '#FFF')}}>
        <span onClick={this._onClick.bind(this)}>
          {this.trackToText()}
        </span>
      </td>
    )
  }

}
