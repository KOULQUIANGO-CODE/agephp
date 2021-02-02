<?php
// credenciales database
define('DB_USUARIO','uyhyjtak5whutw8e');
define('DB_PASSWORD','XPP6HkVsJEdZP6LXcd8i');
define('DB_HOST','b0j3pf2czziijzzz9u9h-mysql.services.clever-cloud.com');
define('DB_NAME','b0j3pf2czziijzzz9u9h');
$conn = new mysqli(DB_HOST,DB_USUARIO,DB_PASSWORD,DB_NAME);
// echo $conn->ping(); comrueba conexion
if ($conn->connect_error){

    echo $error->$conn->connect_error;
}
?>