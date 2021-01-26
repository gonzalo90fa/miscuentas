import React, {Component} from 'react';
import './DatosPrincipales.css'
import GMA_Functions from '../modules/gma_functions';
var data = {
    accounts: [
        {
            id: 1,
            name: 'Cuenta 1',
            description: 'Descripción de mi cuenta',
            reserve: 1340
        },
        {
            id: 2,
            name: 'Cuenta 2',
            description: 'Descripción de mi cuenta',
            reserve: 123.76753
        },
        {
            id: 3,
            name: 'Cuenta 3',
            description: 'Descripción de mi cuenta',
            reserve: 500
        }
    ],
    totalReserve: '0,00'
}
class DatosPrincipales extends Component{
    constructor(){
        super();
        this.state = {
            data: {
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
        }
    }
    componentDidMount(){
        console.log('Component Did Mount');
        // var data = 'hello';
        // const url = './php/load.js';
        // // const url = 'http://localhost:80/mis-cuentas/public/php/load.js';
        // fetch(url,{
        //     method: 'POST',
        //     // headers: {
        //     //     'Content-Type': 'application/x-www-form-urlencoded'
        //     // },
        //     mode: 'no-cors',
        //     body: data
        // })
        // .then(response => {
        //     return response.text();
        // })
        // .then(data => {
        //     console.log('data = ', data);
        // })
        // .catch(err => {
        //     console.error(err);
        // });




        // let url = '../src/php/load';
        // const XHR = new XMLHttpRequest();
        // XHR.open('POST', url, true);
        // XHR.send(null);
        // const promesa = new Promise((resolve,reject) =>{
        //     XHR.onreadystatechange = function(){
        //         if(this.status === 200 && this.readyState === 4){
        //             let respuesta = this.responseText;//JSON.parse(this.responseText);
        //             console.log(respuesta)
        //             data.accounts[0].reserve = 150;
        //             data.accounts[1].reserve = 6617;
        //             data.accounts[2].reserve = 210.643;
        //             let resultado = 0;
        //             // Total reserve calculation
        //             for (let index = 0; index < data.accounts.length; index++) {
        //                 resultado = resultado + data.accounts[index].reserve;
        //             }
        //             var GMA = new GMA_Functions();
        //             data.totalReserve = GMA.numberFormat(resultado,2);
        //             console.log('XHR success!');
        //             resolve(resultado);
        //         }
        //     }
        // });
        // promesa.then( res => {
        //     this.setState({
        //         data: data
        //     })
        // })
    }
    render(){
        console.clear();
        console.log('Renderizado!');
        var mysql = require('mysql');
        var conexion= mysql.createConnection({
            host : 'localhost',
            database : 'gma-mi-billetera',
            user : 'root',
            password : '',
        });
        conexion.connect(function(err) {
            if (err) {
                console.error('Error de conexion: ' + err.stack);
                return;
            }
            console.log('Conectado con el identificador ' + conexion.threadId);
        });
        document.write('Hello world!');
        conexion.end();

        const accounts = this.state.data.accounts.map( account => {
            var GMA = new GMA_Functions();
            return (
                <tr>
                    <td>{account.name}</td>
                    <td>${GMA.numberFormat(account.reserve,2)}</td>
                    <td>{account.description}</td>
                </tr>
            );
        });
        return (
            <div id="div-datosPrincipales">
                <div id="div-reserva">
                    <h2>Reserva total</h2>
                    <span class="span-reserva">${this.state.data.totalReserve}</span>
                    <a class="verRegistros">Ver registros</a>
                </div>
                <div id="div-accounts">
                    <h2>Cuentas</h2>
                    <table id="tabla-DatosPrincipales">{accounts}</table>
                </div>
            </div>
        );
    }
}
export default DatosPrincipales;