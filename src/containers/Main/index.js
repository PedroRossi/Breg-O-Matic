import React, { Component } from 'react';

import Block from '../../components/Block'

import bassSamples from '../../samples/instruments/bass.json';
import drumsSamples from '../../samples/instruments/drums.json';
import keyboardSamples from '../../samples/instruments/keyboard.json';

import bassIcon from '../../images/bass.png';
import drumsIcon from '../../images/drums.png';
import keyboardIcon from '../../images/keyboard.png';

import '../../styles/main.css';

class Main extends Component {

  constructor(props) {
    super(props);
    this.numberOfBlocks = 4;
    this.instruments = {
      bass: {
        samples: bassSamples,
        blocks: Array(this.numberOfBlocks).fill(-1)
      },
      drums: {
        samples: drumsSamples,
        blocks: Array(this.numberOfBlocks).fill(-1)
      },
      keyboard: {
        samples: keyboardSamples,
        blocks: Array(this.numberOfBlocks).fill(-1)
      }
    };
    // let relativePath = '';
    // if (window.location.pathname.indexOf('Breg-O-Matic') !== -1)
    //   relativePath = '/Breg-O-Matic';
    // load instruments on buffer loader here
    for (let instrument in this.instruments) {
      for (let i in this.instruments[instrument].blocks) {
        let aux = <Block key={instrument+i} index={i} instrument={this.instruments[instrument]}/>;
        this.instruments[instrument].blocks[i] = aux;
      }
    }
    let instrumentsRows = this.renderInstruments();
    this.state = {
      instruments: instrumentsRows
    };
  }

  renderInstruments() {
    let ret = [];
    ret.push(
      <div key={-1} className="row">
        <div className="col-md-4 block-img">
          <img src={bassIcon} alt={""} width={50} height={50}/>
        </div>
        <div className="col-md-4 block-img">
          <img src={drumsIcon} alt={""} width={50} height={50}/>
        </div>
        <div className="col-md-4 block-img">
          <img src={keyboardIcon} alt={""} width={50} height={50}/>
        </div>
      </div>
    );
    for (let c=0;c<this.numberOfBlocks;++c) {
      let aux = [];
      for (let i in this.instruments)
        aux.push(this.instruments[i].blocks[c]);
      ret.push(<div key={c} className="row">{aux}</div>);
    }
    return ret;
  }

  renderPlayer() {

  }

  renderImage() {

  }

  render() {
    return(
      <div>
        <div className="row">
          <div className="col-md-3">
            {this.state.instruments}
          </div>
          <div className="col-md-1"></div>
          <div className="col-md-8"></div>
        </div>
      </div>
    );
  }

}

export default Main;
