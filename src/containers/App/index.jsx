import React, { Component } from 'react';
import Welcome from '../Welcome';
import Main from '../Main';
import Loader from '../../utils/loader';
import { data } from '../../data';

const audioContext = new (window.webkitAudioContext || window.AudioContext)();

export class App extends Component {
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
            toRender: <Main instruments={this.instruments} cols={data.cols} context={audioContext} blockDuration={data.samplesPBlock} />
        })
    }

    render() {
        return this.state.toRender;
    }
}

export default App;
