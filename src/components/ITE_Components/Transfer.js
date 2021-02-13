"use strict"
function toTransfer(selector,action){
    /* 
     * Formualrio para realizar una transferencia.
     */
    var selectAccountConf = {
        name:'selectAccount',
        indexClass: '_0',
        selectText: 'Seleccione la cuenta de destino',
        accountAmount: true
    };
    const affectedAccountsInput = selectAccount(selectAccountConf); // <select> con las cuentas del usuario.
    selectAccountConf = {
        id: 'origin-input',
        name:'origin',
        selectText: 'Seleccione la cuenta de origen',
        accountAmount: false
    };
    const originAccountInput = selectAccount(selectAccountConf);
    const html = `
        <form class="ITE_Forms transfer_form" id="ITE_form">
            <span class="closeSpan" onclick="close_ITE_form()">x</span>
            <h1>Transferir</h1>
            <label for="amount">Ingrese el monto a transferir</label>
            <input type="number" name="amount" id="amount-input" step="0.01" placeholder="Sin separador de miles." required>
            ${originAccountInput}
            <div id="div-selects">${affectedAccountsInput}</div>
            <div id="btnAddSelect"><img src="./src/media/img/iconos/add-white-18dp.svg"></div>
            <label for="origin">Nota</label>
            <textarea name="note" id="note-input" placeholder="Alguna nota que desee dejar"></textarea>
            <input type="submit" class="submitOk good-bg" value="Ok">
        </form>`;
    document.querySelector(selector).innerHTML = html;
    let btnAddSelect = document.getElementById('btnAddSelect');
    btnAddSelect.addEventListener('click',()=>{
        let divSelects = document.querySelector('#div-selects');
        let cantDivSelect = divSelects.childElementCount;
        if(cantDivSelect < data.accounts.length){
            const selectAccountConf = {
                name:'selectAccount',
                indexClass: '_'+cantDivSelect,
                selectText: 'Seleccione la cuenta de destino',
                accountAmount: true
            };
            divSelects.innerHTML += selectAccount(selectAccountConf);
            console.log('Se ha agregado un select.');
        }else{
            alert('No tienes más cuentas que agregar.');
        }
    })


    // Enviar datos del formulario
    const btnSubmit = document.querySelector('#ITE_form input[type="submit"]');
    btnSubmit.addEventListener('click', function(e){
        btnSubmit.style.display = 'none';
        e.preventDefault();
        // Se obtienen los values de los selects
        let selects = [];
        let specificAmount = [];
        let cantSelects = document.querySelector('#div-selects').childElementCount;
        // Se recorren todos los grupos de select y campo de texto para obtener sus valores
        // (se obtendrán las cuentas a afectar y los montos para cada una).
        for(let i = 0;i < cantSelects;i++){
            let select = document.querySelector(`.selectAccount-input._${i}`);
            let accountId = select.options[select.selectedIndex].value;
            selects[i] = accountId;
            specificAmount[i] = document.querySelector(`.accountAmount-input._${i}`).value;
        }
        let amount = document.getElementById('amount-input').value;
        specificAmount = validateSA(specificAmount,amount); //Se validan los montos especificos
        // Se verifica que se hayan seleccionado las cuentas a afectar.
        if(selects.includes(null) || selects.includes('null')){
            alert('Debe seleccionar una cuenta.');
            selects = null;
        }
        // Se obtienen los nombres de las cuentas según las id de las mismas.
        if(selects != null){
            var affectedAccounts = [];
            selects.forEach( (accountId,i) => {
                affectedAccounts[i] = data.accounts.find(element => element.id == accountId).name;
            });
        }
        //Se obtienen el origen y la nota de la operación.
        var origin = document.getElementById('origin-input');
        origin = origin.options[origin.selectedIndex].value;
        var note = document.getElementById('note-input').value;

        let dataPost = new FormData();
        // dataPost.append('accountId',accountId);
        dataPost.append('action',action);
        dataPost.append('selects',selects);
        dataPost.append('affectedAccounts',affectedAccounts);
        dataPost.append('specificAmount',specificAmount);
        dataPost.append('origin',origin);
        dataPost.append('note',note);
        const url = './src/php/update.php';
        if(specificAmount != null && selects != null){
            // Se agrega el ingreso o gasto.
            fetch(url, {
                method: 'POST',
                body: dataPost
            })
            .then(response => {
                if(response.ok){
                    return response.text();
                }else{
                    throw 'Error en la llamada';
                }
            })
            .then(response => {
                if(response == 1){
                    console.log('Operación exitosa');
                    let originName = data.accounts.find(element => element.id == origin).name;
                    let resumen = `Se han transferido $${numberFormat(parseFloat(amount),2)} de "${originName}".\n`;
                    for (let index = 0; index < selects.length; index++) {
                        const accountId = selects[index];
                        const accountName = data.accounts.find(element => element.id == accountId).name;
                        resumen = resumen + `- ${accountName}: $${numberFormat(specificAmount[index],2)}\n`;
                    }
                    alert('¡Operación exitosa!\n'+resumen);
                    close_ITE_menu();
                    close_ITE_form();
                    reload();
                }else{
                    console.log(response);
                    alert('Ha ocurrido un error:\n'+response);
                }
                btnSubmit.style.display = 'block';
            })
            .catch(err => {
                console.error('ERROR EN AJAX:\n'+ err );
                alert('Ha ocurrido un error.');
            });
        }else{
            btnSubmit.style.display = 'block';
        }
    });
}