function Player(duration) {
  this.duration = duration;
  this.instruments = {};
  for(i in instruments)
    this.instruments[i] = [];
}

Player.prototype.addTrack = function (sample, instrument, trackBuffer) {
  this.removeTrack(sample, instrument)
  this.instruments[instrument].push({key: sample, track: trackBuffer});
};

Player.prototype.removeTrack = function (sample, instrument) {
  this.instruments[instrument] = this.instruments[instrument].filter(function(val) {
    return val.key != sample;
  });
};

Player.prototype.play = function () {
  var audioBuffer = audioContext.createBuffer(1, this.duration * audioContext.sampleRate, audioContext.sampleRate);
  var audioBufferData = audioBuffer.getChannelData(0);
  var instPerc = 0.3333;
  for(i in instruments) {
    this.instruments[i].sort(function(a, b) {
      if (a.key == b.key) return 0;
      if (a.key < b.key) return -1;
      return 1;
    });
    var t = this.instruments[i];
    for(j in t) {
      var data = t[j].track.getChannelData(0);
      var next = (t[Number(j)+1] && t[Number(j)+1].key) || audioBuffer.length;
      console.log(t[j].key, next);
      for(var k = 0; t[j].key + k < next && k < t[j].track.length; ++k)
        audioBufferData[t[j].key + k] += instPerc*data[k];
      }
  }
  if(this.source) {
    try {
      this.source.stop();
    } catch (e) {
      console.error(e);
    }
  }
  this.source = audioContext.createBufferSource();
  this.source.buffer = audioBuffer;
  this.source.connect(audioContext.destination)
  this.source.start();
};

Player.prototype.stop = function () {
  if(this.source) this.source.stop();
};
