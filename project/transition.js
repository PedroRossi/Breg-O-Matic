// quantidade de tempos a ser tocado
var loopCount = 4*5;
// map com os selects de cada instrumento
var tableMap = {};

function clearScreen() {
  document.getElementById('welcome').hidden = true;
}

function createSelect(tracksLength, instrument, time) {
  var select = document.createElement('select');
  select.instrument = instrument;
  select.time = time;
  select.onclick = function(e) {
    e.preventDefault();
    this.blur();
    window.focus();
    if (this.childNodes.length>this.selectedIndex) {
      if (this.selectedIndex == -1)
        this.selectedIndex++;
      this.selectedIndex++;
      var value = parseInt(e.target.value);
      if (value == -1)
        addTrack(instrument, null, time)
      else
        addTrack(instrument, value, time)
      var audio = instruments[this.instrument][this.selectedIndex-1];
      var tempo = 0;
      if (audio)
        tempo = audio.tempo;
      var i;
      for (i=0;i<tempo/*trocar por tempo da track*/;++i)
        tableMap[this.instrument][this.time+1+i].childNodes[0].className = "red"
      for (;i<4;++i)
        tableMap[this.instrument][this.time+1+i].childNodes[0].className = "white"
    }
  }
  for (var j = -1; j < tracksLength; ++j) {
    var option = document.createElement('option');
    option.value = j;
    if (j >= 0) {
      option.appendChild(document.createTextNode(j));
      option.hidden = true;
    }
    select.appendChild(option);
  }
  select.selectedIndex = 0;
  return select;
}

function createTable() {
  var table = document.createElement('table');
  document.getElementById('main').appendChild(table);
  console.log(this.instruments);
  for(var i in this.instruments) {
    var row = document.createElement('tr');
    table.appendChild(row);
    row.appendChild(document.createElement('tr').appendChild(document.createTextNode(i)));
    var select = document.createElement('select');
    for(var j = 0; j <= loopCount; ++j) {
      var td = document.createElement('td');
      td.appendChild(createSelect(this.instruments[i].length, i, j));
      row.appendChild(td);
    }
    tableMap[i]=row.childNodes;
  }
}

function createButtons() {
  var playBtn = document.createElement('button');
  document.getElementById('main').appendChild(playBtn);
  playBtn.innerHTML="Play";
  playBtn.onclick = playGroup;

  var stopBtn = document.createElement('button');
  document.getElementById('main').appendChild(stopBtn);
  stopBtn.innerHTML="Stop";
  stopBtn.onclick = stopGroup;
}
