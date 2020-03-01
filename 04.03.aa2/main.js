
var bool1 = false;
var bool2 = false;
var bool3 = false;
var bool4 = false;


function drag(ev) {
    ev.dataTransfer.setData("text", ev.target.id);
}

function drop(ev) {
    ev.preventDefault();

    var data = ev.dataTransfer.getData("text");
    
    if (data == "pieza1" && ev.target.id == "contenedor1") {

        var pieza = document.getElementById(data);
        bool1 = true;

        intercambio(pieza, ev.target.id);
    }

    if (data == "pieza2" && ev.target.id == "contenedor2") {
        var pieza = document.getElementById(data);
        bool2 = true;
        intercambio(pieza, ev.target.id);
    }

    if (data == "pieza3" && ev.target.id == "contenedor3") {
        var pieza = document.getElementById(data);
        bool3 = true;
        intercambio(pieza, ev.target.id);
    }

    if (data == "pieza4" && ev.target.id == "contenedor4") {
        var pieza = document.getElementById(data);
        bool4 = true;
        intercambio(pieza, ev.target.id);
    }

    if ( bool1 && bool2 && bool3 && bool4) {
        document.getElementById("completado").innerHTML = "¡¡COMPLETADO!!" ;
    }

}

function allowDrop(ev) {
    ev.preventDefault();
}

function intercambio(pieza,contenedor){

    document.getElementById(contenedor).append( pieza );

}