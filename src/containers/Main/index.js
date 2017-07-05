import React, { Component } from 'react';

import PlayerHeader from '../../components/PlayerHeader';

import Row from  '../../components/Row';

import Player from '../../utils/player';

import '../../styles/main.css';

class Main extends Component {

  constructor(props) {
    super(props);
    this.player = new Player(props.context, props.rows*props.blockDuration, props.instruments);
    this.rows = Object.keys(props.instruments).map((val, idx) => {
      return <Row instrument={props.instruments[val]} columns={props.rows} player={this.player} key={val} blockDuration={props.blockDuration} />;
    });
  }

  render() {
    return (
      <div>
        <table>
          <PlayerHeader player={this.player}/>
          <tbody>
            {this.rows}
          </tbody>
        </table>
      </div>
    )
  }

}

export default Main;
