var contadorDespegados = 0;
var contadorAterrizados = 0;


function drag(ev) {
    ev.dataTransfer.setData("text", ev.target.id);
}

function drop(ev) {
    ev.preventDefault();
    
    var data = ev.dataTransfer.getData("text");
    //ev.target.appendChild(document.getElementById(data));
    if (data == "despegados" && ev.target.id == "caja-despegados") {
        contadorDespegados ++;
        ev.target.innerHTML = "Nº de vuelos Despegados:" + contadorDespegados;
    }

    var data = ev.dataTransfer.getData("text");
    //ev.target.appendChild(document.getElementById(data));
    if (data == "aterrizados" && ev.target.id == "caja-aterrizados") {
        contadorAterrizados ++;
        ev.target.innerHTML = "Nº de vuelos Aterrizados:" + contadorAterrizados;
    }

    var data = ev.dataTransfer.getData("text");
    //ev.target.appendChild(document.getElementById(data));
    if (data == "caja-despegados" && ev.target.id == "cubo") {
        contadorDespegados --;
        if (contadorDespegados < 0) {
            contadorDespegados = 0;
        }
        document.getElementById(data).innerHTML = "Nº de vuelos Despegados:" + contadorDespegados; 
    }

    var data = ev.dataTransfer.getData("text");
    //ev.target.appendChild(document.getElementById(data));
    if (data == "caja-aterrizados" && ev.target.id == "cubo") {
        contadorAterrizados --;
        if (contadorAterrizados < 0) {
            contadorAterrizados = 0;
        }
        document.getElementById(data).innerHTML = "Nº de vuelos Aterrizados:" + contadorAterrizados;
    }

}

function allowDrop(ev) {
    ev.preventDefault();
}