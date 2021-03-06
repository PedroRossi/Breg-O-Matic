export default class Player {

  constructor(context, duration, instruments) {
    this.isPlaying = false;
    this.isPaused = false;
    this.duration = duration;
    this.audioContext = context;
    this.instrumentsTracks = {};
    for(var i in instruments)
      this.instrumentsTracks[i] = [];
  }

  addTrack(sample, instrument, trackBuffer) {
    this.removeTrack(sample, instrument)
    this.instrumentsTracks[instrument].push({key: sample, track: trackBuffer});
  }

  removeTrack(sample, instrument) {
    this.instrumentsTracks[instrument] = this.instrumentsTracks[instrument].filter(val => val.key !== sample)
  }

  play() {
    let audioBuffer = this.audioContext.createBuffer(1, this.duration, this.audioContext.sampleRate);
    let audioBufferData = audioBuffer.getChannelData(0);
    let instPerc = 1.0;
    for (var i in this.instrumentsTracks) {
      this.instrumentsTracks[i].sort((a, b) => {
        if (a.key === b.key) return 0;
        if (a.key < b.key) return -1;
        return 1;
      });
      let t = this.instrumentsTracks[i];
      for (let j in t) {
        let data = t[j].track.getChannelData(0);
        let next = (t[Number(j)+1] && t[Number(j)+1].key) || audioBuffer.length;
        for (let k = 0; t[j].key + k < next && k < t[j].track.length; ++k)
          audioBufferData[t[j].key + k] += instPerc*data[k];
      }
    }
    if (this.source) {
      try {
        if (this.isPaused) {
          this.audioContext.resume();
          this.isPlaying = true;
          this.isPaused = false;
          return;
        } else {
          this.source.stop();
        }
      } catch (e) {
        console.error(e);
      }
    }
    this.source = this.audioContext.createBufferSource();
    this.source.buffer = audioBuffer;
    this.source.connect(this.audioContext.destination);
    this.source.start();
    this.isPlaying = true;
    this.source.onendend = () => {
      this.isPlaying = false;
      this.isPaused = false;
    }
  }

  pause() {
    this.audioContext.suspend();
    this.isPlaying = false;
    this.isPaused = true;
  }

  stop() {
    if(this.source) {
      this.source.stop();
      this.isPaused = false;
      this.isPlaying = false;
    }
  }

  download() {
    // TODO return raw data
  }

}
