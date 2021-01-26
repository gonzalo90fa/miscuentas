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
    totalReserve: '0,00'
    
}
DatosPrincipales('#div-datosPrincipales');
function reload(){
    DatosPrincipales('#div-datosPrincipales');
}