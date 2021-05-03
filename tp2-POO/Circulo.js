class Circulo extends Figuras{
    constructor(posX, posY,radio,fill,context){
        super(posX, posY,fill,context);
        this.radio=radio;
    }

    draw(){
        super.draw();
        this.context.beginPath();
        this.context.arc(this.posX, this.posY,this.radio,0,2*Math.PI);
        this.context.fill();
        this.context.closePath();
    }

    getRadio(){
        return this.radio;
    }
}