export class BufferLoader {
  constructor(context, urlList, callback) {
    this.context = context;
    this.urlList = urlList;
    this.onLoad = callback;
    this.bufferList = [];
    this.loadCount = 0;
  }

  loadBuffer(url, index) {
    var request = new XMLHttpRequest();
    request.open("GET", url, true);
    request.responseType = "arraybuffer";
    var loader = this;
    request.onload = function() {
      loader.context.decodeAudioData(
        request.response,
        function(buffer) {
          if (!buffer) {
            alert('error decoding file data: ' + url);
            return;
          }
          loader.bufferList[index] = buffer;
          if (++loader.loadCount === loader.urlList.length)
            loader.onLoad(loader.bufferList);
        },
        function(error) {
          console.error('decodeAudioData error', error);
        }
      );
    }
    request.onerror = function() {
      alert('BufferLoader: XHR error');
    }
    request.send();
  }

  load() {
    for(var i in this.urlList)
      this.loadBuffer(this.urlList[i], i);
  }

  getLength() {
    return this.urlList.length;
  }
}
