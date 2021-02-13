"use strict"
function DatosPrincipales(selector) {
    let dataPost = new FormData();
    dataPost.append('userKey','dh87aw8dIHAWIDhh8819');
    dataPost.append('action','accounts');
    const url = './src/php/load.php';
    fetch(url, {
        method: 'POST',
        body: dataPost
    })
    .then(response => {
        if(response.ok){
            return response.json();
        }else{
            throw 'Error en la llamada';
        }
    })
    .then(response => {
        console.log("loadAccounts:",response);
        data.accounts = response;
        printDatosPrincipales(selector)
    })
    .catch(err => {
        console.error('ERROR DE AJAX:\n'+ err );
    })
}
function printDatosPrincipales(selector) {
    let totalReserve = 0;
    let accounts = ''
    data.accounts.map( account => {
        let description = account.description;
        if(account.description.length > 12 ){
            description = description.substr(0, 12) + '...';
        }
        accounts = accounts +
            '<tr>'+
                `<td class="_0">${account.name}</td>`+
                `<td class="_1">$${numberFormat(parseFloat(account.reserve),2)}</td>`+
                `<td class="_2">${description}</td>`+
            '</tr>';
        totalReserve = totalReserve + parseFloat(account.reserve);
    });
    totalReserve = numberFormat(totalReserve,2);
    const html = `
        <div id="div-reserva">
            <h2>Reserva total</h2>
            <span class="span-reserva">$${totalReserve}</span>
            <div onclick="showRecordsSection('#div-sections')" class="verRegistros">Ver registros</div>
        </div>
        <div id="div-accounts">
            <h2>Cuentas</h2>
            <table id="tabla-DatosPrincipales">${accounts}</table>
        </div>`;
    document.querySelector(selector).innerHTML = html;
}