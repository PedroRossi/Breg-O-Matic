function clearScreen() {
  document.getElementsByTagName('main')[0].innerHTML = '';
}

function createSelect(tracksLength, instrument, time) {
  var select = document.createElement('select');
  select.onchange = function(e) {
    var value = parseInt(e.target.value);
    if(value == -1) addTrack(instrument, null, time)
    else addTrack(instrument, value, time)
  }
  for(var j = -1; j < tracksLength; ++j) {
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
  for(var i in this.instruments) {
    var row = document.createElement('tr');
    table.appendChild(row);
    row.appendChild(document.createElement('tr').appendChild(document.createTextNode(i)));
    var select = document.createElement('select');
    for(var j = 0; j <= 30; ++j) {
      var td = document.createElement('td');
      td.appendChild(createSelect(this.instruments[i].length, i, j));
      row.appendChild(td);
    }
  }
}