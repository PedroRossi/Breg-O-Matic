import React, { Component } from 'react';

import Block from '../../components/Block'

import bassSamples from '../../samples/instruments/bass.json';
import drumsSamples from '../../samples/instruments/drums.json';
import keyboardSamples from '../../samples/instruments/keyboard.json';

// import bassIcon from '../../images/bass.png';
// import drumsIcon from '../../images/drums.png';
// import keyboardIcon from '../../images/keyboard.png';

import '../../styles/main.css';

class Main extends Component {

  constructor(props) {
    super(props);
    this.numberOfBlocks = 4*5;
    this.instruments = {
      bass: {
        samples: [],
        blocks: Array(this.numberOfBlocks).fill(-1)
      },
      drums: {
        samples: [],
        blocks: Array(this.numberOfBlocks).fill(-1)
      },
      keyboard: {
        samples: [],
        blocks: Array(this.numberOfBlocks).fill(-1)
      }
    };
    let relativePath = '';
    if (window.location.pathname.indexOf('Breg-O-Matic') !== -1)
      relativePath = '/Breg-O-Matic';
    bassSamples.forEach((sample) => this.instruments.bass.samples.push(new Audio(relativePath+'/instruments/bass/'+sample.file)));
    drumsSamples.forEach((sample) => this.instruments.drums.samples.push(new Audio(relativePath+'/instruments/drums/'+sample.file)));
    keyboardSamples.forEach((sample) => this.instruments.keyboard.samples.push(new Audio(relativePath+'/instruments/keyboard/'+sample.keyboard)));
    for (let instrument in this.instruments)
      for (let i in this.instruments[instrument].blocks)
        this.instruments[instrument].blocks[i] = <Block max={this.instruments[instrument].samples.length}/>
    let instrumentsRows = this.renderInstruments();
    this.state = {
      instruments: instrumentsRows
    };
  }

  renderInstruments() {
    let ret = [];
    for (let c=0;c<this.numberOfBlocks;++c) {
      let aux = []
      for (let i in this.instruments)
        aux.push(this.instruments[i].blocks[c])
      ret.push(aux)
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

        </div>
      </div>
    );
  }

}

export default Main;
