function sprite (options) {
  var that = {};

  frameIndex = 0,
  tickCount = 0,
  ticksPerFrame = options.ticksPerFrame || 0;
  numberOfFrames = options.numberOfFrames || 1;

  that.context = options.context;
  that.width = options.width;
  that.height = options.height;
  that.image = options.image;
  that.loop = options.loop;

  that.render = function () {
   that.context.clearRect(0, 0, that.width, that.height);
   that.context.drawImage(
      that.image,
      frameIndex * that.width / numberOfFrames,
      0,
      that.width / numberOfFrames,
      that.height,
      0,
      0,
      that.width / numberOfFrames,
      that.height
    );
};

  that.update = function () {
    tickCount += 1;
    if (tickCount > ticksPerFrame) {
      tickCount = 0;
      if (frameIndex < numberOfFrames - 1) {
        frameIndex += 1;
      }  else if (that.loop) {
        frameIndex = 0;
      }
    }
  };

  return that;
}

var canvas = document.getElementById("coinAnimation");
canvas.width = 100;
canvas.height = 100;

var coinImage = new Image();
coinImage.src = "image/a.png";

var coin = sprite({
    context: canvas.getContext("2d"),
    width: 390,
    height: 100,
    image: coinImage,
    numberOfFrames: 6,
    ticksPerFrame: 4,
    loop: true,
});

function gameLoop () {
  window.requestAnimationFrame(gameLoop);

  coin.update();
  coin.render();
}

coinImage.addEventListener("load", gameLoop);
