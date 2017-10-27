import React, { Component } from 'react';
import '../../styles/headerBlock.css';

export default class HeaderBlock extends Component {
  render() {
    return (
      <td className="headerInstrument">
        <img src={this.props.src} alt="" />
      </td>
    )
  }
}
