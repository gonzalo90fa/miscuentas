"use strict"
var data = {
    accounts: [
        {
            id: 1,
            name: 'Cuenta 1',
            description: 'Descripción de mi cuenta',
            reserve: 0
        }
    ],
    totalReserve: '0,00',
    records: [
        {
            id: 1,
            operation: 'expense',
            affectedAccounts: ['Cuenta 1','Cuenta 2','Cuenta 3'],
            amounts: [0,0,0],
            date: '25-06-2020 08:49',
            origin: 'Food',
            note: 'Shopping for food'
        }
    ]
}
Navigation();
DatosPrincipales('#div-datosPrincipales'); //Se cargan las cuentas
loadRecords(); //Se cargan los registros de operaciones
function reload(){
    DatosPrincipales('#div-datosPrincipales');
    loadRecords();
}