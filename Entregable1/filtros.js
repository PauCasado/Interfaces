document.addEventListener('DOMContentLoaded', () => {
    let canvas = document.getElementById('canvas');
    let ctx = canvas.getContext('2d');
    
    let imagen= new Image();
    imagen.src="imagenes/s.jpg";
    
    imagen.onload = () => {
        canvas.whidth=imagen.whidth;
        canvas.height=imagen.height;
        myDrawImageMethod(imagen);
        // console.log(imagen.whidth,imagen.height);
    }
    function myDrawImageMethod(image){
        ctx.drawImage(image,0,0);
    }

})