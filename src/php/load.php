<?php
require_once('connection.php');
$userKey = $_POST['userKey'];
$action = $_POST['action'];
if($action == 'accounts'){
    loadAccounts();
}
function loadAccounts(){
    $cuentas = [];
    global $connection;
    $sql = "SELECT * FROM accounts_user1";
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
?>