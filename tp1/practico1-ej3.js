let canvas = document.getElementById('ej3');
let ctx= canvas.getContext('2d');

let width=300;
let height=300;

let imageData = ctx.createImageData(width,height); //creo la imagen

//es el que se encarga de estimar los pixeles y el valor de los mismos
const setpixel = (imageData,x,y,r,g,b,a) => {
    let index = (x+y * imageData.height)*4;
    imageData.data[index+0]=r;
    imageData.data[index+1]=g;
    imageData.data[index+2]=b;
    imageData.data[index+3]=a;
}

//recorre los pixeles y les da el color
for (let x=0;x<width;x++){
    for(let y=0;y<height;y++){
        setpixel(imageData,x,y,126,126,126,255);
    }
}

//carga la imagen en los ejes x e y que quieras
ctx.putImageData(imageData,0,0);