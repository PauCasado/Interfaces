document.addEventListener('DOMContentLoaded', () => {
    // let canvas = document.getElementById('ej6')
    // let contenido= canvas.getContext('2d')   
    // function cargar(){
    //     let image = new Image();
    //     image.src = 'Imagenes/s.jpg';
    //     let imageData;
    //     image.onload = () => {

    //     //no me deja acceder a la data de la imagen
    //     // canvas.height = image.height;
    //     // canvas.width = image.width;
    //     // myDrawImage(image);
    //     // imageData = contenido.getImageData(0, 0, image.width, image.height);
    //     // contenido.putImageData(imageData);

    //     contenido.drawImage(image,0,0);

    // }
    // }
    
    // cargar();
    // const myDrawImage = (imgData) => {
    //     contenido.drawImage(imgData, 0, 0);
    // }
//-----------------------------------------------------------------------------------------------
    let canvas = document.getElementById('ej6');
    canvas.whidth=800;
    canvas.height=600;
    
    let ctx = canvas.getContext('2d');
    
    let image1= new Image();
    image1.src="Imagenes/s.jpg";
    
    image1.onload = () => {
        myDrawImageMethod(this);
    }
    function myDrawImageMethod(image){
        ctx.drawImage(image,0,0);
    }
})