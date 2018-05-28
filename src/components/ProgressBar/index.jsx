import React, { Component } from 'react';
import { data } from '../../data/';

class ProgressBar extends Component {

    state = {
        count: 0,
        isPlaying: false
    }
    
    componentDidMount() {
        // TODO review
        // this.width = data.cols * 100
        this.width = document.getElementById('row').offsetWidth
        const totalDuration = data.cols * data.samplesPBlock
        this.pixel = this.width / (totalDuration / 441)
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
            <div style={Object.assign({}, style, {left: this.state.count})}/>
        );
    }

}

const style = {
    width: 2,
    height: 310,
    backgroundColor: 'grey',
    position: 'relative',
    float: 'left'
};

export default ProgressBar;