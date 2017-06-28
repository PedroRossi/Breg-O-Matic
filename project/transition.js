function clearScreen() {
  document.getElementsByTagName('main')[0].innerHTML = '';
}

function createSelect(instrument, time) {
  console.log(instrument);
  var select = document.createElement('select');
  select.onchange = function(e) {
    var value = parseInt(e.target.value);
    if(value == -1) player.removeTrack(time, instrument);
    else player.addTrack(time, instrument, instruments[instrument].bufferList[value]);
  }
  for(var j = -1; j < instruments[instrument].bufferList.length; ++j) {
    var option = document.createElement('option');
    option.value = j;
    if(j >= 0)
      option.appendChild(document.createTextNode(j));
    select.appendChild(option);
  }
  return select
}

function createTable() {
  var table = document.createElement('table');
  document.getElementsByTagName('main')[0].appendChild(table);
  for(var i in instruments) {
    var row = document.createElement('tr');
    table.appendChild(row);
    row.appendChild(document.createElement('tr').appendChild(document.createTextNode(i)));
    var select = document.createElement('select');
    for(var j = 0; j < 20; ++j) {
      var td = document.createElement('td');
      td.appendChild(createSelect(i, j*74371));
      row.appendChild(td);
    }
  }
}

function createButtons() {
  var playBtn = document.createElement('button');
  document.getElementsByTagName('main')[0].appendChild(playBtn);
  playBtn.innerHTML="Play";
  playBtn.onclick = player.play.bind(player);

  var stopBtn = document.createElement('button');
  document.getElementsByTagName('main')[0].appendChild(stopBtn);
  stopBtn.innerHTML="Stop";
  stopBtn.onclick = player.stop.bind(player);
}
