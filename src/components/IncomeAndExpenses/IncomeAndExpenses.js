"use strict"
function AddIncomeOrAddExpense(selector,action) {
    const selectHTML = selectAccount('_0');
    var title = '';
    if(action == 'addIncome'){
        title = 'Agregar ingreso';
    }else if(action == 'addExpense'){
        title = 'Agregar gasto';
    }else{
        title = 'Ha ocurrido un error.';
    }
    // Formualrio para agregar un ingreso o gasto.
    const html = 
        '<form id="form-AddIncomeOrAddExpense">'+
            '<span class="closeSpan" onclick="closeAddForm()">x</span>'+
            `<h1>${title}</h1>`+
            '<label for="amount">Ingrese el monto</label>'+
            '<input type="number" name="amount" id="amount-input" step="0.01" placeholder="Sin separador de miles." required>'+
            '<div id="div-selects">'+
                selectHTML+
            '</div>'+
            '<div id="btnAddSelect"><img src="./src/media/img/iconos/add-white-18dp.svg"></div>'+
            '<input type="submit" class="submitOk good-bg" value="Ok">'+
        '</form>';
    document.querySelector(selector).innerHTML = html;
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
    const formSubmit = document.querySelector('#form-AddIncomeOrAddExpense input[type="submit"]');
    formSubmit.addEventListener('click', function(e){
        formSubmit.style.display = 'none';
        e.preventDefault();
        
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

        if(selects.includes(null) || selects.includes('null')){
            alert('Debe seleccionar una cuenta.');
            selects = null;
        }
        let dataPost = new FormData();
        // dataPost.append('accountId',accountId);
        dataPost.append('action',action);
        dataPost.append('selects',selects);
        dataPost.append('specificAmount',specificAmount);
        dataPost.append('origin',"Prueba");
        dataPost.append.apply('note',"Esto es un registro de prueba.");
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
                    let palabra = '';
                    if(action == 'addIncome'){
                        palabra = 'ingresos';
                    }else if(action == 'addExpense'){
                        palabra = 'gastos';
                    }else{
                        palabra = '[Ha ocurrido un error]';
                    }
                    let resumen = `Se han agregado los siguientes ${palabra}:\n`;
                    for (let index = 0; index < selects.length; index++) {
                        const accountId = selects[index];
                        const accountName = data.accounts.find(element => element.id == accountId).name;
                        resumen = resumen + `- ${accountName}: $${numberFormat(specificAmount[index],2)}\n`;
                    }
                    resumen = resumen + `\nTotal: $${numberFormat(parseFloat(amount),2)}`;
                    alert('¡Operación exitosa!\n'+resumen);
                    closeAddMenu();
                    closeAddForm();
                    reload();
                }else{
                    console.log(response);
                    alert('Ha ocurrido un error:\n'+response);
                }
                formSubmit.style.display = 'block';
            })
            .catch(err => {
                console.error('ERROR EN AJAX:\n'+ err );
                alert('Ha ocurrido un error.');
            });
        }else{
            formSubmit.style.display = 'block';
        }
    });
}
function closeAddForm(){
    let divForms = document.getElementById('div-FormulariosAgregar');
    divForms.innerHTML = '';
    divForms.style.display = 'none';
}
function selectAccount(indexClass){
    /* 
    * Retorna String html con un <select> con las cuentas del usuario.
    * "indexClass" es un valor para la clase del elemento <select>, para usarlo como un identificador numérico,
    * por ejemplo: "_0","_1","_2", etc.
    */
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
    /**
     * Esta funcion valida y reparte los montos específicos a las respectivas cuentas.
     */
    var SA = specificAmount; // SA ---> "Specific Amount"
    var lenghtSA = SA.length;
    console.log('Función validateSA()->entrada:',SA);

    // Se valida que el monto total no sea negativo.
    
    if(/-/.test(totalAmount)){
        alert('El monto no puede ser negativo.');
        return null;
    }

    for (let i = 0; i < lenghtSA; i++) {
        if(SA[i] != '' && SA[i] != null){
            //Se valida que no contenga letras.
            let regExp = /[a-z]|[A-Z]/;
            let resultadoRegExp = regExp.test(SA[i]);
            let msg = 'Los montos solo pueden contener número positivos y los únicos símbolos que se pueden utilizar son "%" para el porcentaje y/o "," o "." para los decimales.';
            if(resultadoRegExp){
                alert(msg);
                return null;
            }
            // Se valida que no tenga espacios en blanco.
            regExp = /\s/;
            resultadoRegExp = regExp.test(SA[i]);
            msg = 'El monto no puede contener espacios en blanco.';
            if(resultadoRegExp){
                alert(msg);
                return null;
            }
            // Se valida que no sea negativo.
            regExp = /-/;
            resultadoRegExp = regExp.test(SA[i]);
            msg = 'El monto no puede ser negativo.';
            if(resultadoRegExp){
                alert(msg);
                return null;
            }
            // Se valida que tenga el formato correcto.
            // regExp = /\b%?[0-9]+((.|,){1}[0-9]+)(%?)\b/g;
            // console.log(regExp.test("120..,12d,312"))
            // resultadoRegExp = regExp.test("120");
            // resultadoRegExp = regExp.test(SA[i]);
            // msg = 'El monto no puede contener espacios en blanco.';
            // if(resultadoRegExp){
            //     alert(msg);
            //     return null;
            // }
            // Hay que arreglar el patrón regExp

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
    for (let index = 0; index < lenghtSA; index++) {
        const element = SA[index];
        if(element != null && element != ''){
            totalAmountNoNull = totalAmountNoNull + SA[index];
        }  
    }
    var resto = totalAmount - totalAmountNoNull;

    //Se tratan los campos vacios (nulos)
    if(SA.includes('') || SA.includes(null)){
        /* Se procede a dar el valor que queda luego de restarle al total
         * los otros montos especificos.
         * Se dividirá según la cantidad de campos vacios.
         */
        // Se cuentan la cantidad de campos null
        let nullIndex = []; //Arreglo con los índices de los campos nulos que hay en el arreglo SA.
        for (let index = 0; index < lenghtSA; index++) {
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
    console.log('Función validateSA()->salida:',SA);
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