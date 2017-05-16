var time;
var cur;

function getVaicarai() {
    new Audio("troinha.mp3").play();
}

function done(timer) {
  clearInterval(timer);
  document.getElementById("but").disabled = false;
  getVaicarai();
  document.getElementById("but").onclick = function() {
    setTimeout(function(){
        clearScreen();
        createTable();
        createButtons();
      }, 1000);
  };
}

function update() {
    var element = document.getElementById(cur.toString());
    element.src = "image/galeroso.png";
    cur += 1
}

function go() {
    var timer = setInterval(
        function() {
            if (cur == 10) {
                done(timer);
            } else update();
        }, 750
    );
}

function main() {
    cur = 0;
    document.getElementById("but").disabled = true;
    go();
}

window.onload = main;