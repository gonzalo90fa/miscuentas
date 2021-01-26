"use strict"
function AddMenu(){
    const container = document.getElementById('div-AddMenu');
    const html = 
        '<div>'+
            // '<div id="div-closeSpan-AddMenu">'+
                '<span id="closeSpan-AddMenu" onclick="closeAddMenu()">x</span>'+
            // '</div>'+
            '<ul>'+
                '<li class="danger-bg">Gastos</li>'+
                `<li onclick="AgregarDinero('#div-FormulariosAgregar')" class="good-bg">Ingresos</li>`+
                '<li class="great-bg">Transferencia</li>'+
            '</ul>'+
        '</div>';
    container.innerHTML = html;
}
function closeAddMenu(){
    document.getElementById('div-AddMenu').innerHTML = '';
}