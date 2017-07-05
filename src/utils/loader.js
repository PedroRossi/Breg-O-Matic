import { BufferLoader } from './bufferLoader.js';

var relativePath = '';

if (window.location.pathname.indexOf('Breg-O-Matic') !== -1)
  relativePath = '/Breg-O-Matic';

var loaded;
function genCallback(instruments, instrument, callBack) {
  return function(bufferArray) {
    loaded += 1;
    instruments[instrument].bufferArray = bufferArray;
    if(loaded === Object.keys(instruments).length)
      callBack(instruments);
  }
}

export default class Loader {
  static load(instruments, context, callBack) {
    loaded = 0;
    for(var i in instruments) {
      // eslint-disable-next-line
      var bufferLoader = new BufferLoader(context, instruments[i].files.map((val, idx) => {
        return relativePath + '/instruments/' + i + '/' + val;
      }), genCallback(instruments, i, callBack));
      bufferLoader.load();
    }
  }
}
