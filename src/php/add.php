<?php 
function addRecord($record){
    global $connection;
    $userId = 1;
    // Se obtiene la cantidad de registros para asignarle una id al nuevo registro.
    $sql = "SELECT * FROM records_user$userId";
    $resultado = mysqli_query($connection,$sql);
    $numRegistros = mysqli_num_rows($resultado);
    $newId = $numRegistros + 1;
    $sql = "INSERT INTO records_user$userId VALUES($newId,'".$record[0]."','".$record[1]."','".implode($record[2],',')."','".$record[3]."','".$record[4]."','".$record[5]."')";
    mysqli_query($connection,$sql);
    return true;
}
?>