<?php 
require_once('connection.php');
$action = $_POST['action'];
if($action == 'addIncome'){
    addIncome();
}
function addIncome(){
    $selects = explode(",", $_POST['selects']);
    $specificAmount = explode(",", $_POST['specificAmount']);
    $amount = $_POST['amount'];
    global $connection;
    // Se obtiene la reserva actual
    for ($i=0; $i < count($selects); $i++) { 
        $SA = $specificAmount[$i]; //SA ---> "Specific Amount"

        
        $accountId = $selects[$i];
        $sql = "SELECT reserve FROM accounts_user1 WHERE id = $accountId";
        $resultado = mysqli_query($connection,$sql);
        $resultadoArray = mysqli_fetch_array($resultado);
        $amount1 = $resultadoArray[0];
        $newAmount = $amount1 + $amount;
        // Se le suma a la reserva el monto dado.
        $sql = "UPDATE accounts_user1 SET reserve = $newAmount WHERE id = $accountId";
        mysqli_query($connection,$sql);
    }
    if($i == count($selects)){
        echo 1;
    }else{
        echo 'Ha ocurrido un error en una o varias consultas.';
    }
}
?>