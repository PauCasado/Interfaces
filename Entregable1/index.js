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
    let width = canvasimagen.width;
    let height = canvasimagen.height;
    var miImagen = new Image();//// Creates image object
    let imagenOriginal;
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
                myDrawImage(miImagen) // Draws the image on canvas
            }
        }
    }
    });
    function myDrawImage(miImagen) {
        ctximagen.drawImage(miImagen, 0, 0, canvasimagen.width,canvasimagen.height);
        imagenOriginal = ctximagen.getImageData(0, 0, canvasimagen.width, canvasimagen.height);
    }
    
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
    //FILTRO BLUR - AYUDA CON SOBEL Y VIDEO DE CLASE
    
    let botonBlur = document.getElementById('filtroBlur');
    botonBlur.addEventListener('click', filtroBlur);

    function filtroBlur(){
        let imageOriginal = ctximagen.getImageData(0,0,canvasimagen.width, canvasimagen.height);
        let imageDataEdit = aplicacionBlur(imageOriginal);
        ctximagen.putImageData(imageDataEdit, 0, 0);

    }
    function aplicacionBlur(imagen){
        let matriz = [
            [1,1,1],
            [1,1,1],
            [1,1,1]
        ];

        let n=9;

        for (let x=(0+1); x<(width-1); x++){
            for (let y= (0+1); y<(height-1); y++){
                let pixel_RGBA_1_SupIzq = getPixel(imagen, x - 1, y - 1); //superior izquirda 1
                let pixel_RGBA_2_Arriba = getPixel(imagen, x - 1, y); //arriba 2
                let pixel_RGBA_3_SupDer = getPixel(imagen, x - 1, y + 1); //superior derecha 3
                let pixel_RGBA_4_Izq = getPixel(imagen, x, y - 1); //izquierda 4
                let pixel_RGBA_5_Centro = getPixel(imagen, x, y); // pixel a cambiar del medio 5
                let pixel_RGBA_6_Der = getPixel(imagen, x, y + 1); // derecha 6
                let pixel_RGBA_7_InfIzq = getPixel(imagen, x + 1, y - 1); // inferior izquierda 7
                let pixel_RGBA_8_Abajo = getPixel(imagen, x + 1, y); // abajo 8
                let pixel_RGBA_9_InfDer = getPixel(imagen, x + 1, y + 1); // inferior derecha 9

                let r = Math.floor((
                    (pixel_RGBA_1_SupIzq[0] * matriz[0][0]) + (pixel_RGBA_2_Arriba[0] * matriz[0][1]) + (pixel_RGBA_3_SupDer[0] * matriz[0][2]) +
                    (pixel_RGBA_4_Izq[0] * matriz[1][0]) + (pixel_RGBA_5_Centro[0] * matriz[1][1]) + (pixel_RGBA_6_Der[0] * matriz[1][2]) +
                    (pixel_RGBA_7_InfIzq[0] * matriz[2][0]) + (pixel_RGBA_8_Abajo[0] * matriz[2][1]) + (pixel_RGBA_9_InfDer[0] * matriz[2][2])
                ) / n);
                let g = Math.floor((
                    (pixel_RGBA_1_SupIzq[1] * matriz[0][0]) + (pixel_RGBA_2_Arriba[1] * matriz[0][1]) + (pixel_RGBA_3_SupDer[1] * matriz[0][2]) +
                    (pixel_RGBA_4_Izq[1] * matriz[1][0]) + (pixel_RGBA_5_Centro[1] * matriz[1][1]) + (pixel_RGBA_6_Der[1] * matriz[1][2]) +
                    (pixel_RGBA_7_InfIzq[1] * matriz[2][0]) + (pixel_RGBA_8_Abajo[1] * matriz[2][1]) + (pixel_RGBA_9_InfDer[1] * matriz[2][2])
                ) / n);
                let b = Math.floor((
                    (pixel_RGBA_1_SupIzq[2] * matriz[0][0]) + (pixel_RGBA_2_Arriba[2] * matriz[0][1]) + (pixel_RGBA_3_SupDer[2] * matriz[0][2]) +
                    (pixel_RGBA_4_Izq[2] * matriz[1][0]) + (pixel_RGBA_5_Centro[2] * matriz[1][1]) + (pixel_RGBA_6_Der[2] * matriz[1][2]) +
                    (pixel_RGBA_7_InfIzq[2] * matriz[2][0]) + (pixel_RGBA_8_Abajo[2] * matriz[2][1]) + (pixel_RGBA_9_InfDer[2] * matriz[2][2])
                ) / n);
                let a =255;
                
                setPixel(imagen,x,y,r,g,b,a);
            }
            
        }
        
        return imagen;
    }
    
    function getPixel(imageData, x, y) {
        let index = (x + y * imageData.height) * 4;
        let r = imageData.data[index + 0];
        let g = imageData.data[index + 1];
        let b = imageData.data[index + 2];
        let a = imageData.data[index + 3];
        return [r, g, b, a];
    }
    function setPixel(imageData, x, y, r, g, b, a) {
        let index = (x + y * imageData.height) * 4;
        imageData.data[index + 0] = r;
        imageData.data[index + 1] = g;
        imageData.data[index + 2] = b;
        imageData.data[index + 3] = a;
        
    }

    //FILTRO SATURATION
    let botonSaturacion = document.getElementById('filtroSaturacion');
    botonSaturacion.addEventListener('click', function() {
        let sat=0.5;
        filtroSaturacion(sat);
        
    });

    function filtroSaturacion(saturacion) {
        let imagenOriginal = ctximagen.getImageData(0, 0,canvasimagen.width, canvasimagen.height);
        for (let x = 0; x < canvasimagen.width; x++) {
            for (let y = 0; y < canvasimagen.height; y++) {
                let pixelRGBA = getPixel(imagenOriginal, x, y);
                let hsv = rgbToHsv(pixelRGBA[0], pixelRGBA[1], pixelRGBA[2]);
                let rgb = HSVtoRGB(hsv[0], (hsv[1] + saturacion), hsv[2]);
                let a = 255;
                setPixel(imagenOriginal, x, y, rgb[0], rgb[1], rgb[2], a);
            }
        }
        ctximagen.putImageData(imagenOriginal, 0, 0);
    };
    function rgbToHsv(r, g, b) {
        var h;
        var s;
        var v;

        var maxColor = Math.max(r, g, b);
        var minColor = Math.min(r, g, b);
        var delta = maxColor - minColor;

        if (delta == 0) {
            h = 0;
        } else if (r == maxColor) {
            h = (6 + (g - b) / delta) % 6;
        } else if (g == maxColor) {
            h = 2 + (b - r) / delta;
        } else if (b == maxColor) {
            h = 4 + (r - g) / delta;
        } else {
            h = 0;
        }

        h = h / 6;

        if (maxColor != 0) {
            s = delta / maxColor;
        } else {
            s = 0;
        }

        v = maxColor / 255;

        return [h, s, v];
    }

    function HSVtoRGB(h, s, v) {
        var r, g, b, i, f, p, q, t;
        if (arguments.length === 1) {
            s = h.s;
            v = h.v;
            h = h.h;
        }
        i = Math.floor(h * 6);
        f = h * 6 - i;
        p = v * (1 - s);
        q = v * (1 - f * s);
        t = v * (1 - (1 - f) * s);
        switch (i % 6) {
            case 0:
                r = v;
                g = t;
                b = p;
                break;
            case 1:
                r = q;
                g = v;
                b = p;
                break;
            case 2:
                r = p;
                g = v;
                b = t;
                break;
            case 3:
                r = p;
                g = q;
                b = v;
                break;
            case 4:
                r = t;
                g = p;
                b = v;
                break;
            case 5:
                r = v;
                g = p;
                b = q;
                break;
        }
        return [
            Math.round(r * 255),
            Math.round(g * 255),
            Math.round(b * 255)
        ];
    }

    //RESTAURAR IMAGEN
    let botonRestaurar = document.getElementById('restaurar');
    botonRestaurar.addEventListener('click', function(){
        ctximagen.putImageData(imagenOriginal, 0, 0);

    });

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