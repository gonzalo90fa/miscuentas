"use strict"
function AddMenu(){
    const container = document.getElementById('div-AddMenu');
    const html = 
        '<div>'+
            '<span id="closeSpan-AddMenu" onclick="closeAddMenu()">x</span>'+
            '<ul>'+
                `<li onclick="AddIncomeOrAddExpense('#div-FormulariosAgregar','addIncome')" class="good-bg">Ingresos</li>`+
                '<li class="great-bg">Transferencia</li>'+
                `<li onclick="AddIncomeOrAddExpense('#div-FormulariosAgregar','addExpense')" class="danger-bg">Gastos</li>`+
            '</ul>'+
        '</div>';
    container.innerHTML = html;
}
function closeAddMenu(){
    document.getElementById('div-AddMenu').innerHTML = '';
}