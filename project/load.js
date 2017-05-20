function loadJSON(path, callback) {
  var httpRequest = new XMLHttpRequest();
  if (window.location.href.indexOf('Breg-O-Matic') !== -1)
    path = '/Breg-O-Matic' + path;
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
  httpRequest.open('GET', path);
  httpRequest.send();
}

function loadAudios(instrument, files) {
  var ret = [];
  for (var i in files)
    ret.push(new Audio('/instruments/' + instrument + '/' + files[i]));
  return ret;
}

function load(callback) {
  loadJSON('/instruments/index.json', function(err, folders) {
    if(err) {
      console.log(err);
      return;
    }
    var ret = { };
    var pending = folders.length;
    for (var i in folders) {
      (function(i, folder) {
        loadJSON('/instruments/' + folder + '/index.json', function(err, files) {
          if(err) {
            console.log(err);
            return;
          }
          ret[folder] = loadAudios(folder, files);
          --pending;
          if(pending == 0 && callback)
            callback(ret);
        })
      })(i, folders[i])
    }
  });
}
