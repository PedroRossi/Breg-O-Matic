trackLength = 2;
tracks = {};
var addTrack = function(instrument,value,position){
  if(tracks[instrument] == undefined)tracks[instrument] = {};
  tracks[instrument][position] = value;
  trackLength = position + 2;
}
var playingNow = {};

var loopey;
var CallB = function(instruments){
  i = 0;
  this.instruments=instruments;
  loopey = setInterval(function(){
    for(key in tracks){
      if(tracks[key][i]!=undefined){
        if(playingNow[key]){
          instruments[key][playingNow[key]].pause();
          instruments[key][playingNow[key]].currentTime = 0;
        }
        instruments[key][tracks[key][i]].play();
        playingNow[key] = tracks[key][i];
      }
    }
    i = i + 1;
    if(i == trackLength)clearInterval(loopey);
  },1000);
}

var stopY = function(){
  clearInterval(loopey);
  for(key in tracks){
    if(playingNow[key]!=undefined){
      this.instruments[key][playingNow[key]].pause();
      this.instruments[key][playingNow[key]].currentTime = 0;
    }
  }
}
