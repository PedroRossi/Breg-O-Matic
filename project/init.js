var time;
var cur;

function done(timer) {
  clearInterval(timer);
  setTimeout(function(){
    clearScreen();
    createTable();
  }, 1000);
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
        }, 1
    );
}

function main() {
    cur = 0;
    go();
}

window.onload = main;