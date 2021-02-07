"use strict"
function showRecordsSection(selector){
    // Imprime contenido HTML que mostrará los registros de operaciones del usuario.
    const html = `
        <section id="recordsSection">
            <header>
                <span class="icon-arrow-left2" onclick="hideSection()"></span>
                <h1>Registros</h1>
            </header>
            <div id="records"></div>
        </section>
    `;
    document.querySelector(selector).innerHTML = html;
    printRecords();
}
function loadRecords(){
    // Obtendrá por medio de AJAX todos los registros.
    let dataPost = new FormData();
    dataPost.append('userKey','dh87aw8dIHAWIDhh8819');
    dataPost.append('action','records');
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
        console.log("loadRecords:",response);
        data.records = response;
        // Hay algunos valores que se almacenan en un mismo campo separandolos con coma.
        // Aquí se los convierte en un arreglo.
        data.records.forEach( record => {
            record.affectedAccounts = record.affectedAccounts.split(',');
            record.amounts = record.amounts.split(',');
        });
    })
    .catch(err => {
        console.error('ERROR EN AJAX:\n'+ err );
    })
}
function printRecords() {
    var recordsHTML = ``; //html con todos los registros
    data.records.forEach( record => {
        const op = record.operation; //Operación o tipo de registro
        // Se calcula el monto total
        var totalAmount = 0;
        record.amounts.forEach( amount => totalAmount=totalAmount+parseFloat(amount));

        // Cuentas afectadas en el registro
        var affectedAccounts = '';
        record.affectedAccounts.forEach( (account, i) => {
            affectedAccounts = affectedAccounts + `
                <li>${account}: $${numberFormat(record.amounts[i],2)}</li>
            `;
        });

        var recordHTML = ''; //html del registro que se concatenará con los otros registros para formar "recordsHTML".
        if(op == 'income'){
            recordHTML = `
                <div class="record income good-bg">
                    <h1>$${numberFormat(totalAmount,2)} agregados</h1>
                    <div class="div-info" id="record${record.id}">
                        <h2>Cuentas afectadas</h2>
                        <ul>
                            ${affectedAccounts}
                        </ul>
                        <h2>Origen</h2>
                        <span>${record.origin}</span>
                        <h2>Fecha</h2>
                        <span>${record.date}</span>
                        <h2>Nota</h2>
                        <p>${record.note}</p>
                    </div>
                    <div class="seeMoreBtn" id="seeMoreBtnRecord${record.id}" onclick="showInfoRecord('record${record.id}',id)">Ver más</div>
                </div>
            `;
        }else if(op == 'transfer'){
            recordHTML = `
                <div class="record transfer great-bg">
                    <h1>$${numberFormat(totalAmount,2)} transferidos de "${record.origin}"</h1>
                    <div class="div-info" id="record${record.id}">
                        <h2>Destino/s</h2>
                        <ul>
                            ${affectedAccounts}
                        </ul>
                        <h2>Fecha</h2>
                        <span>${record.date}</span>
                        <h2>Nota</h2>
                        <p>${record.note}</p>
                    </div>
                    <div class="seeMoreBtn" id="seeMoreBtnRecord${record.id}" onclick="showInfoRecord('record${record.id}',id)">Ver más</div>
                </div>
            `;
        }else if(op == 'expense'){
            recordHTML = `
                <div class="record expense danger-bg">
                    <h1>$${numberFormat(totalAmount,2)} quitados</h1>
                    <div class="div-info" id="record${record.id}">
                        <h2>Cuentas afectadas</h2>
                        <ul>
                            ${affectedAccounts}
                        </ul>
                        <h2>Origen</h2>
                        <span>${record.origin}</span>
                        <h2>Fecha</h2>
                        <span>${record.date}</span>
                        <h2>Nota</h2>
                        <p>${record.note}</p>
                    </div>
                    <div class="seeMoreBtn" id="seeMoreBtnRecord${record.id}" onclick="showInfoRecord('record${record.id}',id)">Ver más</div>
                </div>
            `;
        }
        recordsHTML = recordsHTML + recordHTML;
    });
    document.getElementById('records').innerHTML = recordsHTML;
}
function hideSection(){
    // Quita la ventana.
    document.getElementById("div-sections").innerHTML = '';
}
function showInfoRecord(recordId,btnId){
    // Muestra u oculta el bloque con más información de los registros.
    const divInfo = document.getElementById(recordId);
    const btn = document.getElementById(btnId);
    var btnText = "";
    if(divInfo.style.display != 'none'){
        divInfo.style.display = 'none';
        btnText = "Ver más";
    }else{
        divInfo.style.display = 'block';
        btnText = "Ocultar información";
    }
    btn.innerText = btnText;
}