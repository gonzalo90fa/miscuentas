<?php 
require_once('connection.php');
$action = $_POST['action'];
if($action == 'addIncome'){
    addIncomeOrAddExpense('addIncome');
}else if($action == 'addExpense'){
    addIncomeOrAddExpense('addExpense');
}else if($action == 'addTransfer'){
    addTransfer();
}
function addIncomeOrAddExpense($op){
    $selects = explode(",", $_POST['selects']);
    $specificAmount = explode(",", $_POST['specificAmount']);
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
        // Se guarda el registro de la operación.
        if($op == 'addIncome'){
            $operation = 'income';
        }else if($op == 'addExpense'){
            $operation = 'expense';
        }
        $amounts = $specificAmount;
        $date = date_create();
        $date = date_format($date,"d/m/Y H:i");
        $record[0] = $operation; // Operación realizada
        $record[1] = $_POST['affectedAccounts'];; // Cuentas afectadas
        $record[2] = $amounts; // Montos
        $record[3] = $date; // Fecha
        $record[4] = $_POST['origin']; // Origen de la operación
        $record[5] = $_POST['note']; // Nota dejada por el usuario
        require("./add.php");
        if(addRecord($record)){
            echo 1;
        }else{
            echo "Ha ocurrido un error al guardar el registro.";
        }
    }else{
        echo 'Ha ocurrido un error en una o varias consultas.';
    }
}
function addTransfer(){
    global $connection;
    $selects = explode(",", $_POST['selects']); //Cuentas de destino
    $specificAmount = explode(",", $_POST['specificAmount']); //Montos para cada una
    $origin = $_POST['origin']; //Cuenta de origen
    $totalAmount = 0; // monto total
    foreach ($specificAmount as $amount => $value) {
        $totalAmount = $totalAmount + $value;
    }
    //Se le quita a la cuenta de origen el monto total.
    $sql = "SELECT reserve FROM accounts_user1 WHERE id = $origin";
    $resultado = mysqli_query($connection,$sql);
    $resultadoArray = mysqli_fetch_array($resultado);
    $originReserve = $resultadoArray[0];
    $newReserve = $originReserve - $totalAmount;
    $sql = "UPDATE accounts_user1 SET reserve = $newReserve WHERE id = $origin";
    mysqli_query($connection,$sql);
    //Se les agrega los montos específicos a cada cuenta.
    $lengthSelects = count($selects); //Cantidad de cuentas de destino.
    for ($i=0; $i < $lengthSelects; $i++) { 
        $SA = $specificAmount[$i]; //SA ---> "Specific Amount".
        $accountId = $selects[$i];
        //Se obtiene la reserva actual de la cuenta de destino.
        $sql = "SELECT reserve FROM accounts_user1 WHERE id = $accountId";
        $resultado = mysqli_query($connection,$sql);
        $resultadoArray = mysqli_fetch_array($resultado);
        $amount1 = $resultadoArray[0];
        //Se le suma el monto específico.
        $newReserve = $amount1 + $SA;
        $sql = "UPDATE accounts_user1 SET reserve = $newReserve WHERE id = $accountId";
        mysqli_query($connection,$sql);
    }
    if($i == $lengthSelects){
        // Se guarda el registro de la operación.
        $sql = "SELECT `name` FROM accounts_user1 WHERE id = $origin";
        $resultado = mysqli_query($connection,$sql);
        $resultadoArray = mysqli_fetch_array($resultado);
        $origin = $resultadoArray[0];

        $operation = 'transfer';
        $amounts = $specificAmount;
        $date = date_create();
        $date = date_format($date,"d/m/Y H:i");
        $record[0] = $operation; // Operación realizada
        $record[1] = $_POST['affectedAccounts'];; // Cuentas afectadas
        $record[2] = $amounts; // Montos
        $record[3] = $date; // Fecha
        $record[4] = $origin; // Origen de la operación
        $record[5] = $_POST['note']; // Nota dejada por el usuario
        require("./add.php");
        if(addRecord($record)){
            echo 1;
        }else{
            echo "Ha ocurrido un error al guardar el registro.";
        }
    }else{
        echo 'Ha ocurrido un error en una o varias consultas.';
    }
}
?>