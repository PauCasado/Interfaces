let canvas = document.getElementById('canvas');
let context = canvas.getContext('2d');
let width = canvas.width;
let height = canvas.height;

let circlePosX= Math.round(Math.random()* width);
let circlePosY= Math.round(Math.random()* height);
let circleColor = randomRGBA();
let circleRadio = 20;

context.fillStyle =circleColor;
context.beginPath();
context.arc(circlePosX, circlePosY,circleRadio,0,2*Math.PI);
context.fill();
context.closePath();

let rectPosX = Math.round(Math.random()* width);
let rectPosY = Math.round(Math.random()* height);
let gradient = context.createLinearGradient(rectPosX, rectPosY,50,30);
gradient.addColorStop(0,'red');
gradient.addColorStop(0.5,'yellow');
context.fillStyle=gradient;
context.fillRect(rectPosX, rectPosY,50,50);

// PARA PONER UNA IMAGEN DE FONDO EN FIGURAS
// var img = new Image();
// img.src = 'https://mdn.mozillademos.org/files/222/Canvas_createpattern.png';
// img.onload = function() {
//   var pattern = context.createPattern(img,'repeat');
//   context.rect(rectPosX, rectPosY,150,100);
//   context.fillStyle=pattern;
//   context.fill();
// };


function randomRGBA(){
    let r = Math.round(Math.random()*255);
    let g = Math.round(Math.random()*255);
    let b = Math.round(Math.random()*255);
    let a =255;
    return `rgba(${r},${g},${b},${a})`;
}