var time;
var cur;

function update() {
    var element = document.getElementById(cur.toString());
    element.src = "image/galeroso.png";
    cur += 1
}

function go() {
    var timer = setInterval(
        function() {
            if (cur == 10) {
                clearInterval(timer);
            } else update();
        }, 500
    );
}

function main() {
    cur = 0;
    go();
}

window.onload = main;