import React, { Component } from 'react';
import Bass from '../../images/bass.png';
import Drums from '../../images/drums.png';
import Keyboard from '../../images/keyboard.png';

class InstrumentsHeader extends Component {

  render() {
    return (
        <div style={styles.wrapper}>
            <div style={styles.box}>
                <img style={styles.img} src={Bass} alt={""}/>
            </div>
            <div style={styles.box}>
                <img style={styles.img} src={Drums} alt={""}/>
            </div>
            <div style={styles.box}>
                <img style={styles.img} src={Keyboard} alt={""}/>
            </div>
        </div>
    );
  }

}

const styles = {
    wrapper: {
        width: 100,
        position: 'absolute',
        top: 0,
        left: 100,
    },
    box: {
        verticalAlign: 'middle',
        width: 100,
        height: 100,
        cursor: 'pointer',
        paddingTop: 10,
        border: '2px solid black'
    },
    img: {
        width: 100,
        height: 100,
        paddingBottom: 10
}
};

export default InstrumentsHeader;
