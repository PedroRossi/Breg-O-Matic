import React from 'react';
import ReactDOM from 'react-dom';
import Welcome from './containers/Welcome';
import registerServiceWorker from './utils/registerServiceWorker';
import './styles/index.css';

/*
  Welcome
    tela de welcome original
  Main
    header
      dos instrumentos
        icones
      do player
        play/pause
        stop
    lista
      dos instrumentos
        bloco representando cada tempo
      da barra de progresso
        seta indicadora
*/

ReactDOM.render(<Welcome timeout={100}/>, document.getElementById('root'));
registerServiceWorker();
