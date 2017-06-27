var relativePath = '';

if (window.location.pathname.indexOf('Breg-O-Matic') !== -1)
  relativePath = '/Breg-O-Matic';

var audioContext = new (window.webkitAudioContext || window.AudioContext)();

function loadJSON(path, callback) {
  var httpRequest = new XMLHttpRequest();
  httpRequest.onreadystatechange = function() {
    if (httpRequest.readyState === 4) {
      if (httpRequest.status === 200) {
        var data = JSON.parse(httpRequest.responseText);
        if (callback) callback(null, data);
      } else {
        if (callback) callback(new Error(httpRequest.statusText));
      }
    }
  };
  httpRequest.open('GET', relativePath+path, true);
  httpRequest.send();
}

var instruments = {};

function loadInstrument(instrument) {
  loadJSON(relativePath + '/instruments/' + instrument + '/index.json', function(err, data) {
    if(err) {
      if(callback) callback(err);
      else throw err;
    } else {
      for(i in data)
        instruments[instrument].addURL(relativePath + '/instruments/' + instrument + '/' + data[i]);
      instruments[instrument].load();
    }
  })
}

function callbackUnify(count, callback) {
  return function() {
    count -= 1;
    if(count == 0) callback();
  }
}

function loadInstruments(callback) {
  loadJSON(relativePath + '/instruments/index.json', function(err, data) {
    if(err) {
      if(callback) callback(err);
      else throw err;
    } else {
      var nCallback = callbackUnify(data.length, callback);
      for(i in data) {
        instruments[data[i]] = new BufferLoader(audioContext, [], nCallback);
        loadInstrument(data[i]);
      }
    }
  })
}
