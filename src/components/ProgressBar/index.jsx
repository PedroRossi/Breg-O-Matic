import React, { Component } from 'react';
import '../../styles/progressBar.css';

class ProgressBar extends Component {

    constructor(props) {
        super(props);
        this.state = {
            count: 0
        };
    }

    componentDidMount() {
        //this.countID = setInterval(() => this.tick(), 1);
    }

    componentWillUnmount() {
        clearInterval(this.countID);
    }

    tick() {
        this.setState(prevState => ({
            count: prevState.count + 10
        }));
    }

    render() {
        return (
            <div className="progressBar" style={{left: 200 + this.state.count}}/>
        );
    }

}

export default ProgressBar;