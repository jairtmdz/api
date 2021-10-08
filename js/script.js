let http = new XMLHttpRequest();
http.open("POST", 'https://api.datos.gob.mx/v2/Releases_SFP', true);
http.setRequestHeader('Content-type', 'text/html; charset=UTF-8');
http.onreadystatechange = function() {
    if (http.readyState == 4) {
        if (http.status == 200)
            OkCallback(JSON.parse(http.responseText));
        else
            ErrorCallback(http);
    }
};
http.onerror = OkCallback;
http.send(text);

'use strict';
const tbody = document.querySelector('#tbl-datos tbody');
let mostrar_datos = async() => {
    let productos = await listar_productos();
    tbody.innerHTML = '';
    for (let i = 0; i < productos.length; i++) {
        let fila = tbody.insertRow();
        fila.insertCell().innerHTML = productos[i]['pagination'];
        fila.insertCell().innerHTML = productos[i]['results'];
    }
};

let listar_productos = async() => {
    let productos;
    await axios({
            method: 'get',
            url: 'https://api.datos.gob.mx/v2/Releases_SFP',
            responseType: 'json'
        }).then(function(res) {
            productos = res.data.productos;
        })
        .catch(function(err) {
            console.log(err);
        });
    return productos;
};


mostrar_datos();
