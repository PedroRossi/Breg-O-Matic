import React, { Component } from 'react'
import '../../styles/block.css';

export default class Block extends Component {
  _onClick() {
    if(this.props.onClick)
      this.props.onClick();
  }

  trackToText() {
    if(this.props.track === -1)
      return '-'
    return '' + this.props.track;
  }

  render() {
    return (
      <div style={Object.assign({}, styles.box, {backgroundColor: (this.props.color ? 'rgb(238, 195, 204)' : '#FFF')})} onClick={this._onClick.bind(this)}>
        <span style={styles.span}>
          {this.trackToText()}
        </span>
      </div>
    )
  }

}

const styles = {
  box: {
    textAlign: 'center',
    cursor: 'pointer',
    display: 'inherit',
    border: '2px solid black'
  },
  span: {
    fontSize: 30,
    marginTop: 30
  }
}
