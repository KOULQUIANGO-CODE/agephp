<?php 
    include_once 'includes/layout/header.php';
    include 'includes/function/function.php';
    ;?>
    <?php $id = filter_var($_GET['id'], FILTER_VALIDATE_INT);
    // FILTER_VALIDATE_INT lo convierte de string a int 
    if(!$id){
        die('No es válido');
    }else{
        $resultado = obtenerContacto($id);
        $contacto = $resultado->fetch_assoc();
    }
?>
<!-- <pre> -->
<?php
    // var_dump($contacto)?>
<!-- </pre> -->
    <div class="contenedor-barra">
        <div class="contenedor barra">
            <!-- para la barra se usa grid -->
            <a href="index.php" class="btn volver">volver</a>
            <h1>Editar Contacto</h1>
        </div>
    </div>
    <div class="bg-amarillo contenedor sombra">
        <form action="#" id="contacto">
            <legend>Edite el Contacto</legend>
            <?php include_once 'includes/layout/formulario.php';?>
        </form>
    </div>

<?php include_once 'includes/layout/footer1.php';?>