"use strict"
var allAccounts = {};
function viewLoad(view) {
    if(view[0] == 'accounts'){
        reservesLoad(view);
    }else if(view[0] == 'earnings'){

    }else if(view[0] == 'records'){

    }else{
        console.log('Error GMA-er:1')
    }
}
function reservesLoad(view) {
    //se efectua la consulta a la bd
    let cuentas = 'Error al cargar';
    $.ajax({
        type: "POST",
        url: "php/load.php",
        data: { 
            view: view
        },
        dataType: 'json',
        success: function (cuentas){
            console.log('response: '+cuentas)
            let reservaTotal = 0;
            for (let index = 0; index < cuentas.length; index++) {
                console.log(parseFloat(cuentas[index].reserve));
                reservaTotal = reservaTotal + parseFloat(cuentas[index].reserve);
            }
            allAccounts = {
                cuentas,
                reservaTotal: reservaTotal
            };
            console.log('Reserva total: $'+reservaTotal);
            $('#div-reserva > .span-reserva').html('$' + numberFormat(reservaTotal,2) );
        }
    });
}