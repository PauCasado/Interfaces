let canvas = document.getElementById('canvas');
canvas.whidth=800;
canvas.height=600;
let width=600;
let height=500;
let mitad=height/2;

let ctx = canvas.getContext('2d');
let imageData = ctx.createImageData(width,height);

const setpixel = (imageData,x,y,r,g,b,a) => {
    let index = (x+y * imageData.height)*4;
    imageData.data[index+0]=r;
    imageData.data[index+1]=g;
    imageData.data[index+2]=b;
    imageData.data[index+3]=a;
}

for (let x=0;x<height;x++){
    for(let y=0;y<mitad;y++){
        //R=00,00,00
        //G=255,255,0
        r=(y/mitad)*255;
        g=(y/mitad)*255;
        b=0;
        setpixel(imageData,x,y,r,g,b,255);
    }
    for(let y=mitad;y<width;y++){
        //R=255,255,0
        //G=255,00,00
        r=255;
        g=255-(y/width*255);
        b=0;
        setpixel(imageData,x,y,r,g,b,255);
    }
}
//cambiar x por y y hacer lo de to

ctx.putImageData(imageData,0,0);

//R=255,0,0
//G=0,255,0
//de rojo a verde
//for(let y=mitad;y<height;y++){
//     r= 255-((y/height)*255);
//     g=y/height*255; //permite el degrade
//     b=0;
//     setpixel(imageData,x,y,r,g,b,255);
// }

