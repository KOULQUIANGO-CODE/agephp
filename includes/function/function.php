<?php
function obtenerContactos(){
    require_once('database.php');
    try {
        return $conn->query("SELECT id_contacto,nombre,empresa,telefono FROM contactos");
    } catch (Exception $e) {
        echo "¡ERROR!" . $e->getMessage() . '<br>';
        return false;
    }
}
// obtiene un contacto y toma un id
function obtenerContacto($id){
    require_once('database.php');
    try {
        return $conn->query("SELECT id_contacto,nombre,empresa,telefono FROM contactos WHERE id_contacto = $id");
    } catch (Exception $e) {
        echo "¡ERROR!" . $e->getMessage() . '<br>';
        return false;
    }
}
?>