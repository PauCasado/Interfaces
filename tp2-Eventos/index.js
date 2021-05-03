document.addEventListener('DOMContentLoaded', () => {
    let canvas = document.getElementById('canvas');
    let ctx = canvas.getContext('2d');
    
    var img = new Image();
    img.src = 'https://mdn.mozillademos.org/files/222/Canvas_createpattern.png';
    img.onload = function() {
       
        ctx.arc(250,250,50,0,Math.PI*2);
        var pattern = ctx.createPattern(img,'repeat');
        ctx.fillStyle=pattern;
        ctx.fill();
    };

    
    let coordenadas ={x:250, y:250};
    canvas.addEventListener('mousedown', clickCircle);
       
    function clickCircle(event){
        
        let radio = Math.sqrt(((event.clientX - canvas.offsetLeft)- coordenadas.x) ** 2 + ((event.clientY - canvas.offsetTop) - coordenadas.y) ** 2);
        if (radio<50){
            canvas.addEventListener('mousemove',mover);
            canvas.addEventListener('mouseup', parar);
        }
        
    }
    function mover(event){
        coordenadas.x=event.clientX - canvas.offsetLeft;
        coordenadas.y=event.clientY - canvas.offsetTop;
        clearCanvas();
        redraw(coordenadas.x,coordenadas.y);
    }
    function parar(){
        clearCanvas();
        redraw(coordenadas.x,coordenadas.y);
        canvas.removeEventListener('mousemove', mover);
    }
    
    function redraw(coordX,coordY){
        ctx.beginPath();
        var pattern = ctx.createPattern(img,'repeat');
        ctx.arc(coordX,coordY,50,0,Math.PI*2);
        ctx.fillStyle=pattern;
        ctx.fill();
    };
    
    function clearCanvas(){
        ctx.fillStyle='#f0f8ff';
        ctx.fillRect(0,0,canvas.width,canvas.height);
    };
   
   
});