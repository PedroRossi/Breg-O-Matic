import React, { Component } from 'react';

import Row from  '../../components/Row';

import Player from '../../utils/player';

import '../../styles/main.css';

class Main extends Component {

  constructor(props) {
    super(props);
    this.player = new Player(props.context, props.rows*props.blockDuration, props.instruments);
    console.log(props.instruments['drums'])
    this.rows = Object.keys(props.instruments).map((val, idx) => {
      return <Row instrument={props.instruments[val]} columns={props.rows} player={this.player} key={val} blockDuration={props.blockDuration} />;
    });
  }

  _onPlay() {
    this.player.play();
  }

  render() {
    return (
      <div>
        <button onClick={this._onPlay.bind(this)}>
          PLAY
        </button>
        <table>
          <tbody>
            {this.rows}
          </tbody>
        </table>
      </div>
    )
  }

}

export default Main;
