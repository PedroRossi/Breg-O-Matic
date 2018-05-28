import React, { Component } from 'react';
import galeroso from '../../images/galeroso.png';
import galeroso2 from '../../images/galeroso2.png';
import troinha from '../../samples/troinha.mp3';
// import '../../fonts/PermanentMarker.ttf';

class Welcome extends Component {

  constructor(props) {
    super(props);
    let loading = [];
    for (let i=0;i<10;++i)
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

  render() {
    return (
      <div style={styles.center}>
        <h1 style={styles.h1}>
          {'Bem-vindo ao Breg-O-Matic, carai!'}
        </h1>
        <div style={styles.images} id="images">
          {this.state.loading}
        </div>
        <div>
          <button
            style={styles.btn}
            disabled={!this.state.button}
            onClick={this.props.onDone}>
            {'VAI CARAI!'}
          </button>
        </div>
      </div>
    );
  }
}

const styles = {
  h1: {
    fontWeight: 'lighter',
    fontSize: '350%',
    fontFamily: 'PermanentMarker',
    textAlign: 'center',
    marginTop: 150,
    color: 'yellow',
    textShadow: '-2px 0 black, 0 5px black, 5px 0 black, 0 -2px black'
  },
  images: {
    opacity: 1,
    alignContent: 'center',
    marginTop: 50
  },
  btn: {
    cursor: 'pointer',
    backgroundColor: 'white',
    padding: '10px 15px',
    borderRadius: 25,
    border: 4,
    borderColor: 'yellow',
    fontSize: '100%',
    fontSize: 20,
    fontFamily: 'Title',
    textAlign: 'center',
    borderStyle: 'ridge',
    color: 'yellow',
    textShadow: '-1px 0 black, 0 2px black, 2px 0 black, 0 -1px black',
    marginTop: 75
  },
  center: {
    textAlign: 'center'
  }
};

export default Welcome;
