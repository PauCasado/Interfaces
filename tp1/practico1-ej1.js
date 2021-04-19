document.addEventListener("DOMContentLoaded", Iniciar);
function Iniciar(){
    "use strict";
    let maxf=100;
    let maxc=100
    let matriz=[];

    function getnumero(){
        return Math.floor((Math.random() * 99) + 1); 

    }
    
    let boton=document.getElementById("boton");
    boton.addEventListener("click", function(){
        
        for(let c=0;c<maxc;c++){
                   
            matriz[c]= getnumero();
            document.getElementById("tabla").innerHTML += "<tbody><td>" + matriz[c] + "</td></tbody>";
            
            
        }
        console.log(matriz);
        matriz.push;
    });
}