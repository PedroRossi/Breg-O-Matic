import React, { Component } from 'react';

import playIcon from '../../images/play2.svg';
import stopIcon from '../../images/stop1.svg';
import downloadIcon from '../../images/download1.svg';

import '../../styles/playerHeader.css';

class PlayerHeader extends Component {

  constructor(props) {
    super(props);
    this.player = props.player;
  }

  play() {
    if (this.player.isPlaying)
      this.player.pause();
    else
      this.player.play();
  }

  stop() {
    this.player.stop();
  }

  download() {
    // TODO get raw data and make the download
  }

  render() {
    return (
      <thead>
        <tr>
          <td className="player">
            <img src={playIcon} alt={""} onClick={this.play.bind(this)}/>
          </td>
        </tr>
        <tr>
          <td className="player">
            <img src={stopIcon} alt={""} onClick={this.stop.bind(this)}/>
          </td>
        </tr>
        <tr>
          <td className="player">
            <img src={downloadIcon} alt={""} onClick={this.download.bind(this)}/>
          </td>
        </tr>
      </thead>
    )
  }

}

export default PlayerHeader;
