// quantidade de tempos a ser tocado
var loopCount = 4*5;
// map com os selects de cada instrumento
var tableMap = {};

function clearScreen() {
  document.getElementById('welcome').hidden = true;
}

function createSelect(instrument, time) {
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
        player.removeTrack(time, instrument)
      else
        player.addTrack(time, instrument, instruments[instrument].bufferList[value])
      var audio = instruments[instrument][value];
      var tempo = 0;
      if (audio)
        tempo = audio.tempo;
      var i;
      for (i=0;i<tempo;++i)
        tableMap[this.instrument][this.time+1+i].childNodes[0].className = "red"
      for (;i<4;++i) {
        if (tableMap[this.instrument][this.time+1+i].childNodes[0].selectedIndex<=0)
          tableMap[this.instrument][this.time+1+i].childNodes[0].className = "white";
        else
          break;
      }
    }
  }
  for (var j = -1; j < instruments[instrument].bufferList.length; ++j) {
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
  var margin = 0;
  for(var i in this.instruments) {
    var row = document.createElement('tr');
    table.appendChild(row);
    var title = document.createElement('td');
    title.appendChild(document.createTextNode(i));
    row.appendChild(title);
    for(var j = 0; j <= loopCount; ++j) {
      var td = document.createElement('td');
      td.appendChild(createSelect(this.instruments[i].length, i, j));
      row.appendChild(td);
    }
    if (row.childNodes[1].offsetLeft>margin)
      margin = row.childNodes[1].offsetLeft;
    tableMap[i]=row.childNodes;
  }
  var progress = document.createElement('div');
  progress.className = "progress";
  console.log(margin);
  progress.style['margin-left'] = margin+'px';
  progress.style.width = (table.offsetWidth-(margin+5))+'px';
  progress.innerHTML = "aaaa";
  var progressBar = document.createElement('div');
  progressBar.className = "progress-bar";
  document.getElementById('main').appendChild(progress);
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
