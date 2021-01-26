<?php 
require_once('connection.php');
$action = $_POST['action'];
if($action == 'addIncome'){
    addIncomeOrAddExpense('addIncome');
}else if($action == 'addExpense'){
    addIncomeOrAddExpense('addExpense');
}
function addIncomeOrAddExpense($op){
    $selects = explode(",", $_POST['selects']);
    $specificAmount = explode(",", $_POST['specificAmount']);
    // $amount = $_POST['amount']; not used
    global $connection;
    // Se obtiene la reserva actual
    $lengthSelects = count($selects);
    for ($i=0; $i < $lengthSelects; $i++) { 
        $SA = $specificAmount[$i]; //SA ---> "Specific Amount"

        
        $accountId = $selects[$i];
        $sql = "SELECT reserve FROM accounts_user1 WHERE id = $accountId";
        $resultado = mysqli_query($connection,$sql);
        $resultadoArray = mysqli_fetch_array($resultado);
        $amount1 = $resultadoArray[0];
        // Se suma o resta el dinero indicado según corresponda.
        if($op == 'addIncome'){
            $newAmount = $amount1 + $SA;
        }else if($op == 'addExpense'){
            $newAmount = $amount1 - $SA;
        }else{
            $newAmount = $amount1;
        }
        // Se actualiza la reserva.
        $sql = "UPDATE accounts_user1 SET reserve = $newAmount WHERE id = $accountId";
        mysqli_query($connection,$sql);
    }
    if($i == $lengthSelects){
        echo 1;
    }else{
        echo 'Ha ocurrido un error en una o varias consultas.';
    }
}
?>