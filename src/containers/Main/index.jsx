import React, { Component } from 'react';

import PlayerHeader from '../../components/PlayerHeader';
import InstrumentsHeader from '../../components/InstrumentsHeader';
import ProgressBar from '../../components/ProgressBar';
import Row from  '../../components/Row';

import Player from '../../utils/player';

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
      <div style={styles.wrapper}>
        <PlayerHeader player={this.player} toogleIsPlaying={this.toogleIsPlaying} stop={this.stop}/>
        <InstrumentsHeader />
        <div style={styles.rowsWrapper}>
          <ProgressBar ref={instance => { this.progressbar = instance; }} />
          <div style={styles.grid}>
            {this.rows}
          </div>
        </div>
      </div>
    )
  }

}

const width = window.innerWidth

const styles = {
  wrapper: {
    margin: '0 auto',
    display: 'grid',
    gridTemplateColumns: '100px 100px auto',
    width: '100%'
  },
  rowsWrapper: {
    position: 'absolute',
    top: 0,
    left: 200,
    overflowY: 'hidden',
    overflowX: 'scroll',
    width: width-200,
    height: 300
  },
  grid: {
    position: 'relative',
    display: 'grid',
    gridTemplateRows: 'repeat(3, 100px)',
  }
};

export default Main;
