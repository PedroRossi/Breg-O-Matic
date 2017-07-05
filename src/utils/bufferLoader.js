export class BufferLoader {

  constructor(context, urlList, callback) {
    this.context = context;
    this.urlList = urlList;
    this.onLoad = callback;
    this.bufferList = [];
    this.loadCount = 0;
  }

  loadBuffer(url, index) {
    let request = new XMLHttpRequest();
    request.open("GET", url, true);
    request.responseType = "arraybuffer";
    let loader = this;
    request.onload = () => {
      loader.context.decodeAudioData(
        request.response,
        (buffer) => {
          if (!buffer) {
            alert('error decoding file data: ' + url);
            return;
          }
          loader.bufferList[index] = buffer;
          if (++loader.loadCount === loader.urlList.length)
            loader.onLoad(loader.bufferList);
        },
        (error) => {
          console.error('decodeAudioData error', error);
        }
      );
    }
    request.onerror = () => {
      alert('BufferLoader: XHR error');
    }
    request.send();
  }

  load() {
    for(let i in this.urlList)
      this.loadBuffer(this.urlList[i], i);
  }

  getLength() {
    return this.urlList.length;
  }
}
