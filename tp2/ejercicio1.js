let canvas = document.getElementById('canvas');
let context = canvas.getContext('2d');
let width = canvas.width;
let height = canvas.height;

let circlePosX= Math.round(Math.random()* width);
let circlePosY= Math.round(Math.random()* height);
let circleColor = 'red';
let circleRadio = 20;

context.fillStyle =circleColor;
context.beginPath();
context.arc(circlePosX, circlePosY,circleRadio,0,2*Math.PI);
context.fill();
context.closePath();