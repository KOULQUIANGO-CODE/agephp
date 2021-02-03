<?php 
include_once 'includes/layout/header.php';
include_once 'includes/function/function.php';
?>
<div class="contenedor-barra" id="index">
    <h1>Agenda de Contactos</h1>
</div>
<div class="bg-amarillo contenedor sombra">
    <form action="#" id="contacto">
        <legend>Añada un Contactos<span>Todos los campos son obligatorios</span></legend>
        <!-- css flexbox -->
        <?php include_once 'includes/layout/formulario.php';?>
    </form>


<?php include_once 'includes/layout/footer.php';?>