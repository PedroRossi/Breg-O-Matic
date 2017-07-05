import React, { Component } from 'react';

import playIcon from '../../images/play.png';
import pauseIcon from '../../images/pause.png';
import stopIcon from '../../images/stop.svg';
// import downloadIcon from '../../images/download1.svg';

import '../../styles/playerHeader.css';

class PlayerHeader extends Component {

  constructor(props) {
    super(props);
    this.player = props.player;
    this.state = {
      btn: <img src={playIcon} alt={""} onClick={this.play.bind(this)}/>
    }
  }

  play() {
    let btn;
    if (this.player.isPlaying) {
      this.player.pause();
      btn = <img src={playIcon} alt={""} onClick={this.play.bind(this)}/>
    } else {
      this.player.play();
      btn = <img src={pauseIcon} alt={""} onClick={this.play.bind(this)}/>
    }
    this.setState({
      btn: btn
    });
  }

  stop() {
    this.player.stop();
    this.setState({
      btn: <img src={playIcon} alt={""} onClick={this.play.bind(this)}/>
    });
  }

  download() {
    // TODO get raw data and make the download
  }

  render() {
    return (
      <thead>
        <tr>
          <td className="player">
            {this.state.btn}
          </td>
        </tr>
        <tr>
          <td className="player">
            <img src={stopIcon} alt={""} onClick={this.stop.bind(this)}/>
          </td>
        </tr>
        <tr>
        </tr>
      </thead>
    );
    // <td className="player">
    // <img src={downloadIcon} alt={""} onClick={this.download.bind(this)}/>
    // </td>
  }

}

export default PlayerHeader;
