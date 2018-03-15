import React, { Component } from 'react';
import PlayerHeader from '../../components/PlayerHeader';
import Row from  '../../components/Row';
import Player from '../../utils/player';
import ProgressBar from '../../components/ProgressBar';
import '../../styles/main.css';

class Main extends Component {

  constructor(props) {
    super(props);
    this.player = new Player(props.context, props.cols*props.blockDuration, props.instruments);
    this.rows = Object.keys(props.instruments).map((val, idx) => {
      return <Row instrument={props.instruments[val]} columns={props.cols} player={this.player} key={val} blockDuration={props.blockDuration} />;
    });
  }

  toogleIsPlaying = () => this.progressbar.toogleIsPlaying();

  stop = () => this.progressbar.stop();

  render() {
    return (
      <div>
        <table>
          <PlayerHeader player={this.player} toogleIsPlaying={this.toogleIsPlaying} stop={this.stop}/>
          <tbody id="tbody">
            <ProgressBar ref={instance => { this.progressbar = instance; }} />
            {this.rows}
          </tbody>
        </table>
      </div>
    )
  }

}

export default Main;
