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
</div>
<div class="bg-blanco contenedor sombra contacto">
    <div class="contenedor-contactos">
        <h2>Contactos</h2>
        <input type="text" id="buscar" class="buscador sombra" placeholder="Buscar Contactos...">

        <p class="total-contactos"><span></span>Contactos</p>
        <div class="contenedor-tabla">
            <table id="listado-contactos" class="listado-contactos">
                <thead>
                    <tr>
                        <th>Nombre</th>
                        <th>Empresa</th>
                        <th>Teléfono</th>
                        <th>Acciones</th>
                    </tr>
                </thead>
                <tbody>
                    <?php $contactos = obtenerContactos();?>
                    <!-- <pre> -->
                <?php// var_dump($contactos) ?> 
                    <!-- num_rows el numero de registro --> 
                    <!-- </pre> -->
                    <?php if($contactos->num_rows){
                        foreach($contactos as $contacto){
                        ?>
                    <tr>
                        <!-- <pre> -->
                    <?php //var_dump($contacto) ?>
                    <!-- </pre> -->
                        <td><?php echo $contacto['nombre']?></td>
                        <td><?php echo $contacto['empresa']?></td>
                        <td><?php echo $contacto['telefono']?></td>
                        <td>
                            <a href="editar.php?id=<?php echo $contacto['id_contacto'];?>" class="btn-editar btn">
                                <i class="fas fa-pen-square"></i>
                            </a>
                            <button type="button" data-id="<?php echo $contacto['id_contacto'];?>"
                                class="btn btn-borrar">
                                <!-- data-"es como mi propia propio atributo" -->
                                <i class="fas fa-trash-alt"></i>
                            </button>
                        </td>
                    </tr>
                    <?php }//final foreach
                    }
                    ?>
                    <!-- fin if -->
                </tbody>
            </table>
        </div>
    </div>
</div>

<?php include_once 'includes/layout/footer.php';?>