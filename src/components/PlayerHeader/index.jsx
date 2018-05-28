import React, { Component } from 'react';
import playIcon from '../../images/play.png';
import pauseIcon from '../../images/pause.png';
import stopIcon from '../../images/stop.svg';
import downloadIcon from '../../images/download1.svg';

class PlayerHeader extends Component {

  constructor(props) {
    super(props);
    this.player = props.player;
    this.playBtn = (<img style={styles.img} src={playIcon} alt={""} onClick={this.play.bind(this)}/>);
    this.pauseBtn = (<img style={styles.img} src={pauseIcon} alt={""} onClick={this.play.bind(this)}/>);
    this.state = {
      btn: this.playBtn
    }
  }

  play() {
    let btn;
    if (this.player.isPlaying) {
      this.player.pause();
      btn = this.playBtn;
    } else {
      this.player.play();
      btn = this.pauseBtn;
    }
    this.props.toogleIsPlaying();
    this.setState({
      btn: btn
    });
  }

  stop() {
    this.player.stop();
    this.props.stop();
    this.setState({
      btn: this.playBtn
    });
  }

  download() {
    // TODO get raw data and make the download
  }

  render() {
    return (
      <div style={styles.wrapper}>
        <div style={styles.box}>
          {this.state.btn}
        </div>
        <div style={styles.box}>
          <img style={styles.img} src={stopIcon} alt={""} onClick={this.stop.bind(this)}/>
        </div>
        <div style={styles.box}>
          <img style={styles.img} src={downloadIcon} alt={""} onClick={this.download.bind(this)}/>
        </div>
      </div>
    );
  }

}

const styles = {
  wrapper: {
    width: 100,
    position: 'absolute',
    top: 0,
    left: 0
  },
  box: {
    verticalAlign: 'middle',
    width: 100,
    height: 100,
    cursor: 'pointer',
    paddingTop: 10,
    border: '2px solid black'
  },
  img: {
    width: 90,
    height: 90,
    cursor: 'pointer',
    paddingBottom: 10
  }
};

export default PlayerHeader;
