document.addEventListener('DOMContentLoaded', () => {
    
    let botondibujar = document.getElementById('dibujar');
    botondibujar.addEventListener('click',()=>{
        canvasdibujo.addEventListener('mousedown', detenerBorrado);
        canvasdibujo.addEventListener('mousedown', iniciarDibujo);
        canvasdibujo.addEventListener('mouseup', detenerDibujado);
        canvasdibujo.addEventListener('mousemove', dibujo);
        
    });
    let botonborrar =document.getElementById('goma');
    botonborrar.addEventListener('click', ()=>{
        canvasdibujo.addEventListener('mousedown', detenerDibujado);
        canvasdibujo.addEventListener('mousedown', iniciarBorrado);
        canvasdibujo.addEventListener('mouseup', detenerBorrado);
        canvasdibujo.addEventListener('mousemove', borro);

    });
    
    let canvasdibujo = document.getElementById('canvasdibujo');
    let ctxdibujo = canvasdibujo.getContext('2d');
    let imageData = ctxdibujo.createImageData(canvasdibujo.width,canvasdibujo.height);
    
    const setpixel = (imageData,x,y,r,g,b,a) => {
    let index = (x+y * imageData.height)*4;
    imageData.data[index+0]=r;
    imageData.data[index+1]=g;
    imageData.data[index+2]=b;
    imageData.data[index+3]=a;
    }
    for (let x=0;x<canvasdibujo.width;x++){
        for(let y=0;y<canvasdibujo.height;y++){
            setpixel(imageData,x,y,255,255,255,255);
        }
    }
    ctxdibujo.putImageData(imageData,0,0);
    
    //BOTON DIBUJAR
    let coordenadas ={x:0, y:0} //cursor en posicion inicial
    var dibujar= new Boolean; //se inicializa en false
    var borrar= new Boolean; 
    
    function obtenerPosicion(event){ //actualizamos coordenadas cuando evento se dispara
        coordenadas.x= event.clientX - canvasdibujo.offsetLeft;
        coordenadas.y= event.clientY - canvasdibujo.offsetTop;
    }
    function iniciarDibujo(event){
        dibujar=true;
        obtenerPosicion(event);
    }
    function detenerDibujado(){
        dibujar=false;
    }
    function dibujo(event){
        if(!dibujar) return;
            ctxdibujo.beginPath();
            ctxdibujo.lineWidth = 10;
            ctxdibujo.lineCap='round'; //trazo redondeado
            ctxdibujo.strokeStyle = '#000000';
            ctxdibujo.moveTo(coordenadas.x,coordenadas.y); //cursor para comenzar a dibujar se mueve a estas coodenadas
            obtenerPosicion(event); //la posicion del cursor se actualiza a medida que movemos el mouse
            ctxdibujo.lineTo(coordenadas.x,coordenadas.y); //se traza una linea desde el inicio
            ctxdibujo.stroke(); //se dibuja la linea
            ctxdibujo.closePath();
    }

    //BOTON BORRAR   
    function iniciarBorrado(event){
        borrar=true;
        obtenerPosicion(event);
    }
    function detenerBorrado(){
        borrar=false;
    }
    function borro(event){
        if(!borrar) return;
            ctxdibujo.beginPath();
            ctxdibujo.lineWidth=30;
            ctxdibujo.strokeStyle='white';
            ctxdibujo.moveTo(coordenadas.x,coordenadas.y); //cursor para comenzar a dibujar se mueve a estas coodenadas
            obtenerPosicion(event); //la posicion del cursor se actualiza a medida que movemos el mouse
            ctxdibujo.lineTo(coordenadas.x,coordenadas.y);
            ctxdibujo.stroke();
    }

    //BOTON LIMPIAR
    let botonlimpiar = document.getElementById('limpiar');
    botonlimpiar.addEventListener('click', function(){
        for (let x=0;x<canvasdibujo.width;x++){
            for(let y=0;y<canvasdibujo.height;y++){
                setpixel(imageData,x,y,255,255,255,255);
            }
        }
        ctxdibujo.putImageData(imageData,0,0);
    });

    //CANVAS CON IMAGEN Y FILTROS
    var canvasimagen = document.getElementById("canvasimagen"); // Creates a canvas object
    var ctximagen = canvasimagen.getContext("2d");

    var miImagen = new Image();//// Creates image object
    //CARGA DE IMAGEN
    let imgInput = document.getElementById('upload');
    imgInput.addEventListener('change', function (e) {
    if (e.target.files) {
        let imageFile = e.target.files[0]; //here we get the image file
        var reader = new FileReader();
        reader.readAsDataURL(imageFile);
        reader.onloadend = function (e) {
            miImagen.src = e.target.result; // Assigns converted image to image object
            miImagen.onload = function (ev) {
                canvasimagen.width = miImagen.width; // Assigns image's width to canvas
                canvasimagen.height = miImagen.height; // Assigns image's height to canvas
                ctximagen.drawImage(miImagen, 0, 0); // Draws the image on canvas
            }
        }
    }
    });

    //FILTRO NEGATIVO
    //http://w3.unpocodetodo.info/canvas/blancoynegro.php
    let botonNegativo = document.getElementById('filtroNegativo');
    botonNegativo.addEventListener('click', function(){
      filtroNegativo();
    });
    function filtroNegativo() {
    
        var imageData = ctximagen.getImageData(0, 0, canvasimagen.width, canvasimagen.height);
        var pixels = imageData.data;
        var numPixels = imageData.width * imageData.height;
    
        for (var i = 0; i < numPixels; i++) {
        var r = pixels[i * 4];
        var g = pixels[i * 4 + 1];
        var b = pixels[i * 4 + 2];
    
        var grey = (r + g + b) / 3;
    
        pixels[i * 4] = grey;
        pixels[i * 4 + 1] = grey;
        pixels[i * 4 + 2] = grey;
        }    
    
        ctximagen.putImageData(imageData, 0, 0);
    
    
    };


})