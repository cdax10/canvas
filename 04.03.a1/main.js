var lienzo=null, canvas=null;
var x=50,y=50;
var lastPress=null; //Variable para guardar la tecla presionada
//En nuestro juego, usaremos las teclas izquierda, arriba, derecha y abajo, cuyos valores numéricos son 37, 38, 39 y 40 respectivamente.
var KEY_LEFT=37;
var KEY_UP=38;
var KEY_RIGHT=39;
var KEY_DOWN=40;
var KEY_PAUSE=16; //PAUSA EL JUEGO
var KEY_RESET=18;
var pausa=false;
var lastKey=0;
var gameover=false;
var obstaculox;
var obstaculoy;
var obstaculoh;
var obstaculow;
var iniciarobstaculo=true;


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

    //Reiniciar
    if (lastPress==KEY_RESET) 
    {
        x=50;
        y=50;

        KEY_LEFT=37;
        KEY_UP=38;
        KEY_RIGHT=39;
        KEY_DOWN=40;

        pausa=false;
        gameover=false;
        iniciarobstaculo=true;
    }

    if(iniciarobstaculo)
    {
    //Generar obstaculo
    obstaculox= getRandomArbitrary(0,canvas.width)-40;
    obstaculoy= getRandomArbitrary(0,canvas.height)-40;
    obstaculoh=40;
    obstaculow=40;

    iniciarobstaculo=false;
    }


    //Pausa el juego
    if(lastPress==KEY_PAUSE)
    {
        
        if (!pausa) 
        {
            lastPress=0;
            pausa=true;
            y=y;
            x=x;

            KEY_LEFT=0;
            KEY_UP=0;
            KEY_RIGHT=0;
            KEY_DOWN=0;
        }
        else
        {
            lastPress=lastKey;
            pausa=false;

            KEY_LEFT=37;
            KEY_UP=38;
            KEY_RIGHT=39;
            KEY_DOWN=40;
        }

    } 

    if ( x>=(canvas.width-10) || x<=0 || y>=(canvas.height-10) || y<=0 
    //|| pausa
    || ( (x>=obstaculox-10 && x<=obstaculox+40)&&(y>=obstaculoy-10 && y<=obstaculoy+40) ) 
    ){

    KEY_LEFT=0;
    KEY_UP=0;
    KEY_RIGHT=0;
    KEY_DOWN=0;

    gameover=true;

    } else {
        if(lastPress==KEY_RIGHT)
        {
            x+=5;
            lastKey=KEY_RIGHT;
        }

        if(lastPress==KEY_LEFT)
        {
            x-=5;
            lastKey=KEY_LEFT;
        }

        if(lastPress==KEY_UP)
        {
            y-=5;
            lastKey=KEY_UP;
        }

        if(lastPress==KEY_DOWN)
        {
            y+=5;
            lastKey=KEY_DOWN;
        }


    }
 

}
function pintarLienzo(lienzo){
    lienzo.fillStyle="#F7F9FA"; //le ponemos un color al lienzo
    lienzo.fillRect(0,0,canvas.width,canvas.height); //Dibujamos el lienzo
    lienzo.fillStyle='#0f0';
    lienzo.fillRect(x,y,10,10); //Dibujamos el jugador: va por posición x,y y es de 10x10

    lienzo.fillStyle='#8A2BE2';
    lienzo.fillRect(obstaculox,obstaculoy,40,40);
    

    //
    if(gameover)
    {
        lienzo.fillStyle='#FF0000';
        lienzo.font = "30px Georgia";
        lienzo.fillText("GAMEOVER", (canvas.width/2)-90, canvas.height/2);
        //lienzo.fill();
    }
    else if(pausa)
    {
        lienzo.fillStyle='#FF0000';
        lienzo.font = "30px Georgia";
        lienzo.fillText("PAUSA", (canvas.width/2)-50, canvas.height/2);
    }
    
}
function getRandomArbitrary(min, max) {
    return Math.random() * (max - min) + min;
}


document.addEventListener('keydown', function(evt) { 
    //Creamos un manejador de evento para el teclado que se encargue de almacenar la tecla presionada. El evento que nos interesa en este caso es keydown
    lastPress=evt.keyCode;
}, false);


window.addEventListener("load", iniciar, false);