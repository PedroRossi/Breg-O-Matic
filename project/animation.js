function sprite (options) {
  var that = {};

  that.frameIndex = 0;
  that.tickCount = options.delay;
  that.ticksPerFrame = options.ticksPerFrame || 0;
  that.numberOfFrames = options.numberOfFrames || 1;

  that.context = options.context;
  that.width = options.width;
  that.height = options.height;
  that.image = options.image;
  that.loop = options.loop;

  that.render = function () {
   that.context.clearRect(0, 0, that.width, that.height);
   that.context.drawImage(
      that.image,
      that.frameIndex * that.width / that.numberOfFrames,
      0,
      that.width / that.numberOfFrames,
      that.height,
      0,
      0,
      that.width / that.numberOfFrames,
      that.height
    );
};

  that.update = function () {
    that.tickCount += 1;
    if (that.tickCount > that.ticksPerFrame) {
      that.tickCount = 0;
      if (that.frameIndex < that.numberOfFrames - 1) {
        that.frameIndex += 1;
      }  else if (that.loop) {
        that.frameIndex = 0;
      }
    }
  };

  return that;
}

var canvas = {};

for(var i = 0; i < 4; i++){
  canvas[i] = document.getElementById("canvas"+i)
  canvas[i].width = 65;
  canvas[i].height = 80;
}

var sprites = {};

for(var i = 0; i < 4; i++){
  sprites[i] = new Image();
}

sprites[0].src = "image/spritesheet/male-sheet-1.png";
sprites[1].src = "image/spritesheet/female-sheet-2.png";
sprites[2].src = "image/spritesheet/female-sheet-1.png";
sprites[3].src = "image/spritesheet/male-sheet-2.png";

var animations = {};

for(var i = 0; i < 4; i++){
  animations[i] = sprite({
      context: canvas[i].getContext("2d"),
      width: 195,
      height: 80,
      image: sprites[i],
      numberOfFrames: 3,
      ticksPerFrame: 10,
      loop: true,
      delay: -25*i*i,
  });
}

function gameLoop () {
  window.requestAnimationFrame(gameLoop);

  for(var i = 0; i < 4; i++){
    animations[i].update();
    animations[i].render();
  }
}

sprites[0].addEventListener("load", gameLoop);
