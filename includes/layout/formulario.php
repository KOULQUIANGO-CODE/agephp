<div class="campos">
    <div class="campo">
        <label for="nombre">Nombre</label>
        <input 
        type="text" 
        placeholder="Nombre Contacto" 
        id="nombre"
        value="<?php echo ($contacto['nombre']) ? $contacto['nombre']:'';?>"
        >
        <?php //value="<?php echo ($contacto['nombre']) ? $contacto['nombre']:'';"? >es como un if,
        // si la variable existe <?php echo ($contacto['nombre']) ? $contacto['nombre'], caso contrario : '';  ?>
    </div>

    <div class="campo">
        <label for="empresa">Empresa</label>
        <input type="text" 
        placeholder="Nombre Empresa" 
        id="empresa"
        value="<?php echo ($contacto['empresa']) ? $contacto['empresa']:'';?>"
        >

    </div>
    <div class="campo">
        <label for="telefono">Teléfono</label>
        <input type="tel" 
        placeholder="Nombre Teléfono" 
        id="telefono"
        value="<?php echo ($contacto['telefono']) ? $contacto['telefono']:'';?>">

    </div>
</div>
<div class="campo enviar">
<?php 
$textoBtn = ($contacto['telefono']) ? 'Guardar':'Añadir';
$accion = ($contacto['telefono']) ? 'editar' : 'crear';
?>
<input type="hidden"  id="accion" value="<?php echo $accion; ?>">    
<?php if(isset($contacto['id_contacto'])){?>
   <input type="hidden"  id="id" value="<?php echo $contacto['id_contacto']; ?>"> 
 <?php }?>
<input type="submit" id='btn_click' value="<?php echo $textoBtn; ?>">
</div>