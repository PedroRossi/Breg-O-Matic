import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import Main from '../Main';
import galeroso from '../../images/galeroso.png';
import galeroso2 from '../../images/galeroso2.png';
import troinha from '../../samples/troinha.mp3';
import '../../styles/welcome.css';

class Welcome extends Component {

  constructor(props) {
    super(props);
    let loading = [];
    for (var i=0;i<10;++i)
      loading.push(<img src={galeroso2} alt={""} height={50} width={50} key={i}/>);
    this.state = {loading: loading, button: false};
  }

  componentDidMount() {
    let i=0;
    let timerID = setInterval(
      () => {
        this.loading(i++)
        if (i===10)
          this.loaded(timerID);
      },
      this.props.timeout
    );
  }

  loading(i) {
    let loading = this.state.loading;
    loading[i] = (<img src={galeroso} alt={""} height={50} width={50} key={i}/>);
    this.setState({
      loading: loading
    });
  }

  loaded(timer) {
    clearInterval(timer);
    this.setState({
      button: true
    });
    (new Audio(troinha)).play();
  }

  go(e) {
    ReactDOM.render(<Main/>, document.getElementById('root'));
  }

  render() {
    return (
      <div className="center">
        <h1>Bem vindo ao Breg-O-Matic, carai!</h1>
        <div className="images" id="images">
          {this.state.loading}
        </div>
        <div>
          <button className="btn" disabled={!this.state.button} onClick={this.go}>Vai carai!</button>
        </div>
      </div>
    );
  }
}

export default Welcome;
