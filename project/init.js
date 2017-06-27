var time;
var cur;

function getVaiCarai() {
  new Audio("troinha.mp3").play();
}

function done(timer) {
  clearInterval(timer);
  document.getElementById("but").disabled = false;
  // getVaiCarai();
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
  element.src = "assets/images/galeroso.png";
  cur++;
}

function go() {
  var timer = setInterval(
    function() {
      if (cur == 10)
        done(timer);
      else
        update();
    }, 0 //750
  );
}

function main() {
  cur = 0;
  document.getElementById("but").disabled = true;
  go();
}

window.onload = main;
