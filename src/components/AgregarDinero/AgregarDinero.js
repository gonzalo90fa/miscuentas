"use strict"
function AgregarDinero(selector) {
    const selectHTML = selectAccount('_0');
    const style = '<!-- Style enlazado en head-->';
    const html = 
        '<form id="form-AgregarDinero">'+
            '<span class="closeSpan" onclick="closeFormAddMoney()">x</span>'+
            '<h1>Agregar ingreso</h1>'+
            '<label for="amount">Ingrese el monto</label>'+
            '<input type="number" name="amount" id="amount-input" step="0.01" placeholder="Sin separador de miles." required>'+
            '<div id="div-selects">'+
                selectHTML+
            '</div>'+
            '<div id="btnAddSelect"><img src="./src/media/img/iconos/add-white-18dp.svg"></div>'+
            '<input type="submit" class="submitOk good-bg" value="Ok">'+
        '</form>';
    document.querySelector(selector).innerHTML = style+html;
    let btnAddSelect = document.getElementById('btnAddSelect');
    btnAddSelect.addEventListener('click',()=>{
        let divSelects = document.querySelector('#div-selects');
        let cantDivSelect = divSelects.childElementCount;
        if(cantDivSelect < data.accounts.length){
            divSelects.innerHTML += selectAccount('_'+cantDivSelect);
            console.log('Se ha agregado un select.');
        }else{
            alert('No tienes más cuentas que agregar.');
        }
    })
    // Enviar datos del formulario
    const form = document.querySelector('#form-AgregarDinero input[type="submit"]');
    form.addEventListener('click', function(e){
        e.preventDefault();
        form.style.display = 'none';
        
        // Se obtienen los values de los selects
        let selects = [];
        let specificAmount = [];
        let cantSelects = document.querySelector('#div-selects').childElementCount;
        // se recorren todos los grupos de select y campo de texto para obtener sus valores.
        for(let i = 0;i < cantSelects;i++){
            let select = document.querySelector(`.selectAccount-input._${i}`);
            let accountId = select.options[select.selectedIndex].value;
            selects[i] = accountId;
            specificAmount[i] = document.querySelector(`.accountAmount-input._${i}`).value;
        }
        let amount = document.getElementById('amount-input').value;
        specificAmount = validateSA(specificAmount,amount); //Se validan los montos especificos

        let dataPost = new FormData();
        console.log("SELECTS");
        console.log(selects);
        // dataPost.append('accountId',accountId);
        dataPost.append('action','addIncome');
        dataPost.append('selects',selects);
        dataPost.append('specificAmount',specificAmount);
        dataPost.append('amount',amount);
        const url = './src/php/update.php';
        if(specificAmount != null){
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
                    console.log('addMoney exitoso');
                    reload();
                    let resumen = 'Se han agregado los siguientes ingresos:\n';
                    for (let index = 0; index < selects.length; index++) {
                        const accountId = selects[index];
                        const accountName = data.accounts.find(element => element.id == accountId).name;
                        resumen = resumen + `- ${accountName}: $${numberFormat(specificAmount[index],2)}\n`;
                    }
                    resumen = resumen + `- Total: $${numberFormat(parseFloat(amount),2)}`;
                    alert('¡Operación exitosa!\n'+resumen);
                }else{
                    console.log(response);
                    alert('Ha ocurrido un error:\n'+response);
                }
                form.style.display = 'block';
            })
            .catch(err => {
                console.error('ERROR EN AJAX:\n'+ err );
                alert('Ha ocurrido un error.');
            })
        }
        form.style.display = 'block';
    })

}
function closeFormAddMoney(){
    let divForms = document.getElementById('div-FormulariosAgregar');
    divForms.innerHTML = '';
    divForms.style.display = 'none';
}
function selectAccount(indexClass){
    document.getElementById('div-FormulariosAgregar').style.display = 'flex';
    let accounts = '';
    if(data.accounts.length < 1){
        accounts = '<option value="null">Aún no tienes ninguna cuenta.</option>';
    }else{
        data.accounts.map( account =>{
            accounts = accounts + `<option value="${account.id}">${account.name}</option>`;
        })
    }
    return '<div class="div-select">'+
        '<label for="selectAccount" required>Seleccione la cuenta</label>'+
        `<select name="selectAccount" class="selectAccount-input ${indexClass}">`+
            '<option value="null">----</option>'+
            accounts+
        '</select>'+
        `<input type="text" class="accountAmount-input ${indexClass}" placeholder="Cantidad o porcentaje de monto total"></input>`+
    '</div>';
}
function validateSA(specificAmount,totalAmount){
    // SA ---> "Specific Amount"
    var SA = specificAmount;
    console.log('validateSA()->entrada:');
    console.log(SA);
    for (let i = 0; i < SA.length; i++) {
        if(SA[i] != '' && SA[i] != null){
            // Its value is valid (not null or '')
            if(SA[i].includes('%')){
                // el campo tiene un valor relativo(en porcentaje)
                SA[i] = totalAmount / 100 * parseFloat(SA[i].replace('%', ''));// Se le da un valor absoluto según el porcentaje dado.
            }else{
                // el campo tiene un valor absoluto
                SA[i] = parseFloat(SA[i]);
            }
        }
    }
    // Se obtiene el monto restante para dividir entre los campos vacios.
    var totalAmountNoNull = 0;
    for (let index = 0; index < SA.length; index++) {
        const element = SA[index];
        if(element != null && element != ''){
            totalAmountNoNull = totalAmountNoNull + SA[index];
        }  
    }
    var resto = totalAmount - totalAmountNoNull;
    // if(resto < 0){
    //     resto = 0;
    //     alert(`La suma de los montos especificados para cada cuenta es mayor al monto total ($${totalAmount}).`);
    // }
    //Se tratan los campos vacios (nulos)
    if(SA.includes('') || SA.includes(null)){
        /* Se procede a dar el valor que queda luego de restarle al total
         * los otros montos especificos.
         * Se dividirá según la cantidad de campos vacios.
         */
        // Se cuentan la cantidad de campos null
        let nullIndex = []; //Arreglo con los índices de los campos nulos que hay en el arreglo SA.
        for (let index = 0; index < SA.length; index++) {
            const element = SA[index];
            if(element == null || element == ''){
                nullIndex[nullIndex.length] = index;
            }
        } 
        //se calcula el monto para cada campo vacio y se lo asigna.
        let nullAmounts = resto / nullIndex.length;
        for (let index = 0; index < nullIndex.length; index++) {
            SA[nullIndex[index]] = nullAmounts;
        }
    }
    console.log('validateSA()->salida:');
    console.log(SA);
    // Se valida que todos los montos específicos juntos sean exactamente el 100% del monto total.
    let SAtotal = 0;
    SA.forEach(element => {
        SAtotal = SAtotal + element;
    });
    if(SAtotal == totalAmount){
        return SA;
    }else if(SAtotal < totalAmount){
        alert(`La suma de los montos especificados para cada cuenta es menor al monto total ($${totalAmount}).`);
        return null;
    }else if(SAtotal > totalAmount){
        alert(`La suma de los montos especificados para cada cuenta es mayor al monto total ($${totalAmount}).`);
        return null;
    }
}