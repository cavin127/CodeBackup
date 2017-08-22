// JavaScript source code

function initiate() {

    var elem = document.getElementById('canvas');
    var canvas = elem.getContext('2d');

    canvas.beginPath();
    canvas.moveTo(200, 200);
    canvas.lineTo(200, 400);
    canvas.lineTo(400, 600);

    canvas.closePath();
    canvas.clip();

    canvas.beginPath();

    for (var i = 0; i < 400; i = i + 5)
    {
        canvas.moveTo(0, i);
        canvas.lineTo(500, i);
    }
    canvas.stroke();

}

addEventListener("load", initiate);