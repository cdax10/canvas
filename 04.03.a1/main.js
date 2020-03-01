var lienzo=null, canvas=null;
var x,y; //Posiciones iniciales
var lastPress=null; //Variable para guardar la tecla presionada
var KEY_LEFT=37;
var KEY_UP=38;
var KEY_RIGHT=39;
var KEY_DOWN=40;
var KEY_PAUSE=80; //PAUSA EL JUEGO
var KEY_RESET=82; //RESET ALT GR
var pausa=false;
var lastKey=0;
var gameover=false;
var iniciarobstaculo=true;
var obstaculos = [];
var inicio = true;
var puntos = 0;
var randx;
var randy;
var randw;
var randh;


function Obstaculo( posicionx, posiciony, tamañow, tamañoh) 
{
    this.posicionx = posicionx;
    this.posiciony = posiciony;
    this.tamañow = tamañow;
    this.tamañoh = tamañoh;
}


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

    // Posición Inicial
    if (inicio) {
        reset();
        inicio=false;
    }

    // Reiniciar
    if (lastPress==KEY_RESET) 
    {
        reset();
        //iniciarobstaculo=true;
    }

    if (puntos > 0) 
    {

        for (let i = 0; i < obstaculos.length; i++) 
        {
            if ( (x > obstaculos[i].posicionx-10 && x < (obstaculos[i].posicionx+obstaculos[i].tamañow)) && (y > obstaculos[i].posiciony-10 && y < (obstaculos[i].posiciony+obstaculos[i].tamañoh)) ) 
            {
                gameOver();
            }
        }

    }

    // Pausa el juego
    if(lastPress==KEY_PAUSE && !gameover )
    {
        pause();
    } 

    // limites del canvas
    if ( x>=(canvas.width-10) || x<=0 || y>=(canvas.height-10) || y<=0 )
    {

        gameOver();

    }

    if ( x>=(canvas.width-20) )
    //canvas.width-10,(canvas.height/2)-40,10,80
    {
        puntos++;
        document.getElementById("puntos").innerHTML = puntos;

        meta();
        
    }

    // Movimientos
    if( !gameover && !pausa )
    {
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

    // Lienzo
    lienzo.fillStyle="#F7F9FA"; //le ponemos un color al lienzo
    lienzo.fillRect(0,0,canvas.width,canvas.height); //Dibujamos el lienzo
    // Jugador
    lienzo.fillStyle='#0f0';
    lienzo.fillRect(x,y,10,10); //Dibujamos el jugador: va por posición x,y y es de 10x10
    // Meta
    lienzo.fillStyle='#0f0';
    lienzo.fillRect(canvas.width-10,0,10,canvas.height); //Dibujamos el jugador: va por posición x,y y es de 10x10

    if (puntos > obstaculos.length ) 
    {

        randx= getRandomArbitrary(150,canvas.width-80);
        randy= getRandomArbitrary(0,canvas.height-80);
        randw= getRandomArbitrary(30,100);
        randh= getRandomArbitrary(30,100);

        obstaculos.push( new Obstaculo(randx, randy, randw, randh ) ); 

    }

    for (let i = 0; i < obstaculos.length; i++) 
    {
        lienzo.fillStyle='#8A2BE2';
        lienzo.fillRect(obstaculos[i].posicionx, obstaculos[i].posiciony, obstaculos[i].tamañow, obstaculos[i].tamañoh); 
    }

    if(gameover)
    {
        lienzo.fillStyle='#FF0000';
        lienzo.font = "30px Georgia";
        lienzo.fillText("GAMEOVER", (canvas.width/2)-90, canvas.height/2);
    }

    if(pausa)
    {
        lienzo.fillStyle='#FF0000';
        lienzo.font = "30px Georgia";
        lienzo.fillText("PAUSA", (canvas.width/2)-50, canvas.height/2);
    }
    
    
}

function getRandomArbitrary(min, max) {
    return Math.random() * (max - min) + min;
}

function reset()
{
    x = 50;
    y = (canvas.height/2)-10;

    lastKey=0;

    pausa=false;
    gameover=false;

    lastPress=0;

    puntos=0;
    document.getElementById("puntos").innerHTML = puntos;
    
    obstaculos=[];
}

function meta()
{
    x = 50;
    y = (canvas.height/2)-10;

    lastKey=0;
    lastPress=0;
}

function pause()
{
    if (pausa) 
    {
        pausa=false;
        lastPress=lastKey;
    }
    else
    {
        lastPress=0;
        pausa=true;
    }
}

function gameOver()
{
    gameover=true;
}


document.addEventListener('keydown', function(evt) { 
    //Creamos un manejador de evento para el teclado que se encargue de almacenar la tecla presionada. El evento que nos interesa en este caso es keydown
    lastPress=evt.keyCode;
}, false);


window.addEventListener("load", iniciar, false);