class Rectangulo extends Figuras{
    constructor(posX,posY,width,height,fill,context){
        super(posX,posY,fill,context);
        this.width=width;
        this.height=height;
    }

    draw(){
        super.draw();
        this.context.fillRect(this.posX,this.posY,this.width,this.height);
    }

    getWidth(){
        return this.width;
    }

    getHeight(){
        return this.height;
    }
}