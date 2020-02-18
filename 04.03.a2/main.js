var lienzo=null, canvas=null;
var x=300,y=150;

function iniciar(){
    canvas=document.getElementById('lienzo');
    lienzo=canvas.getContext('2d'); //obtenemos el contexto de dibujo
    run();
}
function run(){
    //requestAnimationFrame(): informa al navegador de que quieres realizar una animación y solicita que el navegador programe el repintado de la ventana para el próximo ciclo de animación.
    requestAnimationFrame(run); //animación optimizada
    accionesJuego();
    pintarLienzo(lienzo);
}
function accionesJuego(){

    if (x<=-300) {
        x = canvas.width
    }

    x--;

}
function pintarLienzo(lienzo){
    
    lienzo.fillStyle="#F7F9FA"; //le ponemos un color al lienzo
    lienzo.fillRect(0,0,canvas.width,canvas.height); //Dibujamos el lienzo
    if (x>=150) {
        lienzo.fillStyle='#000000';
        lienzo.font = (20+(x/4))+"px Georgia";
        lienzo.fillText("Voy a la Izquierda, ¡¡No me gusta la derecha!!", x, y);
        lienzo.fill();   
    } else {
        lienzo.fillStyle='#000000';
        lienzo.font =   (20-(x/4))+"px Georgia";
        lienzo.fillText("Voy a la Izquierda, ¡¡No me gusta la derecha!!", x, y);
        lienzo.fill();   
    }
    
}

document.addEventListener('keydown', function(evt) { 
    //Creamos un manejador de evento para el teclado que se encargue de almacenar la tecla presionada. El evento que nos interesa en este caso es keydown
    lastPress=evt.keyCode;
}, false);


window.addEventListener("load", iniciar, false);