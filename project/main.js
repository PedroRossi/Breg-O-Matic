trackLength = 0;
tracks = {};
var addTrack = function(instrument,value,position){
  console.log(instrument, value, position);
  if(tracks[instrument] == undefined)tracks[instrument] = {};
  tracks[instrument][position] = value;
  trackLength = position + 1;
}
var playingNow = {};

var loopey;
function playGroup(){
  i = 0;
  loopey = setInterval(function(){
    for(key in tracks){
      if(tracks[key][i]!=undefined){
        if(playingNow[key] || playingNow[key] == 0){
          instruments[key][playingNow[key]].pause();
          instruments[key][playingNow[key]].currentTime = 0;
        }
        instruments[key][tracks[key][i]].play();
        playingNow[key] = tracks[key][i];
      }
    }
    i = i + 1;
    if(i == trackLength)clearInterval(loopey);
  }, 1500);
}

var callB = function(instruments){
  this.instruments=instruments;
}

var stopGroup = function(){
  clearInterval(loopey);
  for(key in tracks){
    for(x in instruments[key]){
      instruments[key][x].pause();
      instruments[key][x].currentTime = 0;
    }
  }
}
