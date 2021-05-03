let canvas = document.getElementById('canvas');
let context = canvas.getContext('2d');
let canvasWidth =canvas.width;
let canvasHeight =canvas.height;

let figuras=[];

function addFigura(){
    if(Math.random()>0.5){
        addRectangulo();
    }
    else{
        addCirculo();
    }
    drawFiguras();
}

function drawFiguras(){
    for(let i=0;i< figuras.length;i++){
        figuras[i].draw(context);
    }
}

function addRectangulo(){
    let posX=Math.round(Math.random()*canvasWidth);
    let posY=Math.round(Math.random()*canvasHeight);
    let color= randomRGBA;
    let rect = new Rectangulo(posX,posY,20,20,color,context);
    figuras.push(rect);
}

function addCirculo(){
    let posX=Math.round(Math.random()*canvasWidth);
    let posY=Math.round(Math.random()*canvasHeight);
    let color =randomRGBA();
    let circulo=new Circulo(posX,posY,10,color,context);
    figuras.push(circulo);
}

function addFiguras(){
    addFigura();
    if(figuras.length<30){
        setTimeout(addFiguras,333);
    }
}

setTimeout(()=>{
    addFiguras();
},333)

function randomRGBA(){
    let r = Math.round(Math.random()*255);
    let g = Math.round(Math.random()*255);
    let b = Math.round(Math.random()*255);
    let a =255;
    return `rgba(${r},${g},${b},${a})`;
}