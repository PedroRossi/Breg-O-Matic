var relativePath = '';

if (window.location.pathname.indexOf('Breg-O-Matic') !== -1)
  relativePath = '/Breg-O-Matic';

function loadJSON(path, callback) {
  var httpRequest = new XMLHttpRequest();
  httpRequest.onreadystatechange = function() {
    if (httpRequest.readyState === 4) {
      if (httpRequest.status === 200) {
        var data = JSON.parse(httpRequest.responseText);
        if (callback) callback(null, data);
      } else {
        callback({msg: httpRequest.statusText});
      }
    }
  };
  httpRequest.open('GET', relativePath+path);
  httpRequest.send();
}

function loadSamples(instrument, samples) {
  var ret = [];
  for (var i in samples) {
    var audio = new Audio(relativePath + '/instruments/' + instrument.folder + '/' + samples[i].file);
    audio.tempo = samples[i].tempo;
    ret.push(audio);
  }
  return ret;
}

function load(callback) {
  loadJSON('/instruments/index.json', function(err, instruments) {
    if (err) {
      console.log(err);
      return;
    }
    var ret = {};
    var pending = instruments.length;
    for (var i in instruments) {
      (function(i, instrument) {
        loadJSON('/instruments/' + instrument.folder + '/index.json', function(err, samples) {
          if (err) {
            console.log(err);
            return;
          }
          ret[instrument.folder] = loadSamples(instrument, samples);
          --pending;
          if(pending == 0 && callback)
            callback(ret);
        })
      })(i, instruments[i])
    }
  });
}
