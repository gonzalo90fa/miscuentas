"use strict"
function ITE_menu(){
    const container = document.getElementById('div-ITE_menu');
    const html = `
        <div class="closeDiv" id="closeDiv-ITE_menu" onclick="close_ITE_menu()"></div>
        <div>
            <ul>
                <li onclick="AddIncomeOrAddExpense('#div-ITE_forms','addIncome')" class="good-bg">Ingresos</li>
                <li onclick="toTransfer('#div-ITE_forms','addTransfer')" class="great-bg">Transferencia</li>
                <li onclick="AddIncomeOrAddExpense('#div-ITE_forms','addExpense')" class="danger-bg">Gastos</li>
            </ul>
        </div>`;
    container.innerHTML = html;
}
function close_ITE_menu(){
    document.getElementById('div-ITE_menu').innerHTML = '';
}