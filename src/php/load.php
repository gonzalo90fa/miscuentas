<?php
require_once('connection.php');
$userKey = $_POST['userKey'];
// $userId = $_POST['userId']; proximamente
$userId = 1;
$action = $_POST['action'];
if($action == 'accounts'){
    loadAccounts();
}else if($action == 'records'){
    loadRecords();
}
function loadAccounts(){
    // Obtiene todas las cuentas del usuario y sus datos.
    $cuentas = [];
    global $connection;
    global $userId;
    $sql = "SELECT * FROM accounts_user".$userId;
    $resultado = mysqli_query($connection,$sql);
    $x = 0;
    while($resultadoArray = mysqli_fetch_array($resultado)){
        $cuenta = array(
            'id'=> $resultadoArray[0],
            'name'=>$resultadoArray[1],
            'description'=>$resultadoArray[2],
            'reserve'=>$resultadoArray[3]
        );
        $cuentas[$x] = $cuenta;
        $x++;
    }
    echo json_encode($cuentas);
}
function loadRecords(){
    // Obtiene todos los registros de operaciones del usuario.
    $records = [];
    global $connection;
    global $userId;
    $sql = "SELECT * FROM records_user$userId ORDER BY `id` DESC";
    $resultado = mysqli_query($connection,$sql);
    $x = 0;
    while($resultadoArray = mysqli_fetch_array($resultado)){
        $record = array(
            'id'=> $resultadoArray[0],
            'operation'=>$resultadoArray[1],
            'affectedAccounts'=>$resultadoArray[2],
            'amounts'=>$resultadoArray[3],
            'date'=>$resultadoArray[4],
            'origin'=>$resultadoArray[5],
            'note'=>$resultadoArray[6]
        );
        $records[$x] = $record;
        $x++;
    }
    echo json_encode($records);
}
?>