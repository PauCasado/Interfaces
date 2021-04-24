document.addEventListener('DOMContentLoaded', () => {
    let canvasdibujo = document.getElementById('canvasdibujo');
    let ctxdibujo = canvasdibujo.getContext('2d');

    let botondibujar = document.getElementById('dibujar');
    botondibujar.addEventListener('click',()=>{
        canvasdibujo.removeEventListener('mousedown', detenerDibujado);
        canvasdibujo.removeEventListener('mousedown',iniciarBorrado);
        canvasdibujo.removeEventListener('mouseup', detenerBorrado);
        canvasdibujo.removeEventListener('mousemove', borro);
        canvasdibujo.addEventListener('mousedown', detenerBorrado);        
        canvasdibujo.addEventListener('mousedown', iniciarDibujo);
        canvasdibujo.addEventListener('mouseup', detenerDibujado);
        canvasdibujo.addEventListener('mousemove', dibujo);
        
    });
    
    let botonborrar =document.getElementById('goma');
    botonborrar.addEventListener('click', ()=>{
        canvasdibujo.removeEventListener('mousedown', detenerBorrado);        
        canvasdibujo.removeEventListener('mousedown', iniciarDibujo);
        canvasdibujo.removeEventListener('mouseup', detenerDibujado);
        canvasdibujo.removeEventListener('mousemove', dibujo);
        canvasdibujo.addEventListener('mousedown', detenerDibujado);
        canvasdibujo.addEventListener('mousedown', iniciarBorrado);
        canvasdibujo.addEventListener('mouseup', detenerBorrado);
        canvasdibujo.addEventListener('mousemove', borro);
    });
  
  
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
    
    canvasdibujo.addEventListener('mouseout', () => {
       detenerDibujado();

    })
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

    //FILTRO BLANCO Y NEGRO
    //http://w3.unpocodetodo.info/canvas/blancoynegro.php
    let botonByN = document.getElementById('filtroByN');
    botonByN.addEventListener('click', function(){
      filtroByN();
    });
    function filtroByN() {
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

    //FILTRO NEGATIVO
    //http://w3.unpocodetodo.info/canvas/negativo.php
    let botonNegativo = document.getElementById('filtroNegativo');
    botonNegativo.addEventListener('click', function(){
        filtroNegativo();
    });
    function filtroNegativo(){
        //Devuelve un objeto imgData con los datos de todos los píxeles de la imagen
        var imgData = ctximagen.getImageData(0, 0, canvasimagen.width, canvasimagen.height);
        var pixels = imgData.data;
        // recorre uno a uno los pixeles de la imagen y cambia el color por el complementario
        for (var i = 0; i < pixels.length; i += 4) {
        pixels[i] = 255 - pixels[i]; // rojo
        pixels[i + 1] = 255 - pixels[i + 1]; // verde
        pixels[i + 2] = 255 - pixels[i + 2]; // azul
        }
        ctximagen.putImageData(imgData, 0, 0);
    };

    //FILTRO SEPIA
    //https://www.etnassoft.com/2016/11/03/manipulacion-de-imagenes-con-javascript-parte-1/
    let botonSepia = document.getElementById('filtroSepia');
    botonSepia.addEventListener('click', function(){
      filtroSepia();
    });

    function filtroSepia(){
        let imagen = ctximagen.getImageData(0, 0, canvasimagen.width, canvasimagen.height);
        let pixeles = imagen.data;
        let totalPixeles = imagen.width * imagen.height;

        for (let i = 0; i < totalPixeles; i++) {
            let r = pixeles[i * 4];
            let g = pixeles[i * 4 + 1];
            let b = pixeles[i * 4 + 2];

            pixeles[i * 4] = 255 - r;
            pixeles[i * 4 + 1] = 255 - g;
            pixeles[i * 4 + 2] = 255 - b;

            pixeles[i * 4] = (r * .393) + (g * .769) + (b * .189);
            pixeles[i * 4 + 1] = (r * .349) + (g * .686) + (b * .168);
            pixeles[i * 4 + 2] = (r * .272) + (g * .534) + (b * .131);
        }
        ctximagen.putImageData(imagen, 0, 0);
    };

    //FILTROS CONTRASTE
    //https://www.etnassoft.com/2016/11/03/manipulacion-de-imagenes-con-javascript-parte-1/

    let botonContrasteMas = document.getElementById('filtroContrasteMas');
    botonContrasteMas.addEventListener('click', function(){
      filtroContrasteMas();
    });

    function filtroContrasteMas(){
        let imageData = ctximagen.getImageData(0, 0, canvasimagen.width, canvasimagen.height);
        let pixels = imageData.data;
        let numPixels = imageData.width * imageData.height;
        let factor;

        let contrast = 100; // Default value

        factor = ( 259 * ( contrast + 255 ) ) / ( 255 * ( 259 - contrast ) );

        for ( var i = 0; i < numPixels; i++ ) {
            var r = pixels[ i * 4 ];
            var g = pixels[ i * 4 + 1 ];
            var b = pixels[ i * 4 + 2 ];

            pixels[ i * 4 ] = factor * ( r - 128 ) + 128;
            pixels[ i * 4 + 1 ] = factor * ( g - 128 ) + 128;
            pixels[ i * 4 + 2 ] = factor * ( b - 128 ) + 128;
        }

        ctximagen.putImageData( imageData, 0, 0 );
    };
       
    let botonContrasteMenos = document.getElementById('filtroContrasteMenos');
    botonContrasteMenos.addEventListener('click', function(){
      filtroContrasteMenos();
    });

    function filtroContrasteMenos(){
        let imageData = ctximagen.getImageData(0, 0, canvasimagen.width, canvasimagen.height);
        let pixels = imageData.data;
        let numPixels = imageData.width * imageData.height;
        let factor;

        let contrast = -100; // Default value

        factor = ( 259 * ( contrast + 255 ) ) / ( 255 * ( 259 - contrast ) );

        for ( var i = 0; i < numPixels; i++ ) {
            var r = pixels[ i * 4 ];
            var g = pixels[ i * 4 + 1 ];
            var b = pixels[ i * 4 + 2 ];

            pixels[ i * 4 ] = factor * ( r - 128 ) + 128;
            pixels[ i * 4 + 1 ] = factor * ( g - 128 ) + 128;
            pixels[ i * 4 + 2 ] = factor * ( b - 128 ) + 128;
        }

        ctximagen.putImageData( imageData, 0, 0 );
    };
              
    //FILTRO BRILLO
    let botonBrillo= document.getElementById('filtroBrillo');
    botonBrillo.addEventListener('click', function(){
        filtroBrillo();
    })

    function filtroBrillo(){
        //Devuelve un objeto imgData con los datos de todos los píxeles de la imagen
        var imgData = ctximagen.getImageData(0, 0, canvasimagen.width, canvasimagen.height);
        var pixels = imgData.data;
        var constant= 20;
        // recorre uno a uno los pixeles de la imagen y cambia el color 
        for (var i = 0; i < pixels.length; i += 4) {

            pixels[i]= constant + pixels[i]; // rojo
            pixels[i + 1] = constant + pixels[i + 1]; // verde
            pixels[i + 2] = constant + pixels[i + 2]; // azul
        }
        ctximagen.putImageData(imgData, 0, 0);
    };


    //FILTRO BINARIZACION
    //http://cortesfernando.blogspot.com/2014/05/binarizacion-imagen.html
    let botonBinarizacion= document.getElementById('filtroBinarizacion');
    botonBinarizacion.addEventListener('click', function(){
        filtroBinarizacion();
    })

    function filtroBinarizacion(){
        //Devuelve un objeto imgData con los datos de todos los píxeles de la imagen
        var imgData = ctximagen.getImageData(0, 0, canvasimagen.width, canvasimagen.height);
        var pixels = imgData.data;
        
        var constant= 127.5;
        // recorre uno a uno los pixeles de la imagen y cambia el color 
        for (var i = 0; i < pixels.length; i++) {

            let valor = (pixels[i*4]+pixels[i*4+1]+pixels[i*4+2])/3;
            if(valor<=constant){
                pixels[i* 4]=0;
                pixels[i* 4+1]=0;
                pixels[i*4+2]=0;
            }
            if (valor>constant){
                pixels[i*4]=255;
                pixels[i*4+1]=255;
                pixels[i*4+2]=255;
            }
        }
        ctximagen.putImageData(imgData, 0, 0);
    };
    
    //GUARGAR IMAGEN COMO DESCARGA.
    //https://www.etnassoft.com/2016/11/03/manipulacion-de-imagenes-con-javascript-parte-1/
    let botonGuardar= document.getElementById('guardarImagen');
    botonGuardar.addEventListener('click', function(){
        publicsave();
        let imageData = ctximagen.createImageData(canvasimagen.width,canvasimagen.height);
    
        const setpixel = (imageData,x,y,r,g,b,a) => {
        let index = (x+y * imageData.height)*4;
        imageData.data[index+0]=r;
        imageData.data[index+1]=g;
        imageData.data[index+2]=b;
        imageData.data[index+3]=a;
        }
        for (let x=0;x<canvasimagen.width;x++){
            for(let y=0;y<canvasimagen.height;y++){
                setpixel(imageData,x,y,255,255,255,255);
            }
        }
        ctximagen.putImageData(imageData,0,0);

    });
    function publicsave () {
        var link = window.document.createElement( 'a' ),
            url = canvasimagen.toDataURL(),
            filename = 'screenshot.jpg';

        link.setAttribute( 'href', url );
        link.setAttribute( 'download', filename );
        link.style.visibility = 'hidden';
        window.document.body.appendChild( link );
        link.click();
        window.document.body.removeChild( link );
        
    };

    
    
});