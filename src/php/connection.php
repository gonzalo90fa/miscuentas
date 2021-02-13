<?php
//online
// $host = 'localhost';
// $user = 'ijcjasmf_miscuentas';
// $pass= 'RACUNga356B???';
// $db = 'ijcjasmf_miscuentas';
//localhost
$host = 'localhost';
$user = 'root';
$pass= '';
$db = 'gma-mi-billetera';
$connection = mysqli_connect($host,$user,$pass,$db);
mysqli_set_charset($connection,'utf8');
if(!$connection){
    echo 'Error de conexión a la base de datos.';
}
?>