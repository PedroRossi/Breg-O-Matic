import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import Welcome from './containers/Welcome';
import Main from './containers/Main';
import registerServiceWorker from './utils/registerServiceWorker';
import Loader from './utils/loader';

import { data } from './data';

const audioContext = new (window.webkitAudioContext || window.AudioContext)();

export class Index extends Component {
  constructor(props) {
    super(props);
    this.state = {
      toRender: <Welcome timeout={1} onDone={this._onDone.bind(this)} />
    }
  }

  componentDidMount() {
    Loader.load(data.instruments, audioContext, (instruments) => {
      this.instruments = instruments;
    });
  }

  _onDone() {
    this.setState({
      toRender: <Main instruments={this.instruments} rows={data.rows} context={audioContext} blockDuration={data.samplesPBlock}/>
    })
  }

  render() {
    return this.state.toRender;
  }
}

ReactDOM.render(<Index />, document.getElementById('root'));
registerServiceWorker();
