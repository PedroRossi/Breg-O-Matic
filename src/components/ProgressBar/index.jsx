import React, { Component } from 'react';
import { data } from '../../data/';
import '../../styles/progressBar.css';

class ProgressBar extends Component {

    state = {
        count: 0,
        isPlaying: false
    }
    
    componentDidMount() {
        this.width = document.getElementById('tbody').offsetWidth;
        const totalDuration = data.cols * data.samplesPBlock;
        this.pixel = this.width / (totalDuration / 441);
    }

    toogleIsPlaying() {
        if (!this.state.isPlaying)
            this.countID = setInterval(() => this.tick(), 1);
        else
            clearInterval(this.countID);
        this.setState({isPlaying: !this.state.isPlaying});
    }

    stop() {
        clearInterval(this.countID);
        this.setState({
            count: 0,
            isPlaying: false
        });
    }

    tick() {
        this.setState(prevState => {
            let state = {};
            const count = prevState.count + this.pixel;
            if (count >= this.width) {
                state = {
                    count: 0,
                    isPlaying: false
                };
                clearInterval(this.countID);
            } else {
                state = {
                    count
                };
            }
            return state;
        });
    }

    render() {
        return (
            <div className="progressBar" style={{left: 200 + this.state.count}}/>
        );
    }

}

export default ProgressBar;