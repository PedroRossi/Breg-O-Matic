trackLength = 0;
tracks = {};
var addTrack = function(instrument,value,position){
  if(tracks[instrument] == undefined)tracks[instrument] = {};
  tracks[instrument][position] = value;
  trackLength=position+1;
}

var CallB = function(instruments){
  i = 0;
  var loopey = setInterval(function(){
    for(key in tracks){
      if(tracks[key][i]!=undefined)instruments[key][tracks[key][i]].play();
    }
    i = i + 1;
    if(i == trackLength)clearInterval(loopey);
  },1000);
}
