let canvas = document.getElementById('canvas');
canvas.whidth=800;
canvas.height=600;
let width=600;
let height=500;

let ctx = canvas.getContext('2d');
let imageData = ctx.createImageData(width,height);

const setpixel = (imageData,x,y,r,g,b,a) => {
    let index = (x+y * imageData.height)*4;
    imageData.data[index+0]=r;
    imageData.data[index+1]=g;
    imageData.data[index+2]=b;
    imageData.data[index+3]=a;
}

for (let x=0;x<width;x++){
    for(let y=0;y<height;y++){
        let color=y/height*255; //permite el degrade
        setpixel(imageData,x,y,color,color,color,255);
    }
}
ctx.putImageData(imageData,0,0);
