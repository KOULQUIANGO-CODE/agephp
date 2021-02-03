(function() {
    "use strict";
    // ("#") va a seleccionar el formulario por que tiene el #
    const fomularioContactos = document.querySelector("#contacto"),
        listadoContactos = document.querySelector('#listado-contactos tbody'),
        inputBuscador = document.querySelector('#buscar');
    document.addEventListener('DOMContentLoaded', function() {
        // cuando el formulario de crear o editar se ejecute
        fomularioContactos.addEventListener('submit', leerFomulario);
        // listener para eliminar el boton
        if (document.querySelector('#index')) {
            listadoContactos.addEventListener('click', eleminarContacto);
            // buscador
            inputBuscador.addEventListener('input', buscarContactos);
            numeroContactos();
        }

        function leerFomulario(e) {
            // evitar mas de un envio del formulario


            e.preventDefault(); // previene que la pagina se recarge
            const
                nombre = document.querySelector('#nombre').value,
                empresa = document.querySelector('#empresa').value,
                telefono = document.querySelector('#telefono').value,
                accion = document.querySelector('#accion').value;
            if (nombre === '' || empresa === '' || telefono === '') {
                notificaciones('¡Todos los Campos son Obligatorios!', 'error');
                // 'error' es una clase del css,se lo pone aqui para optimisar el codigo ('texto a imprimir ','la clase que se agragara')
            } else {

                // pasa la validacion, crear llamado a ajax
                const infoContacto = new FormData(); // es la mejor forma para leer el formulario
                // append inserta los parametros al final
                infoContacto.append('nombre', nombre)
                infoContacto.append('empresa', empresa)
                infoContacto.append('telefono', telefono)
                infoContacto.append('accion', accion)
                    // console.log(...infoContacto) los 3 puntos me permiten ver el contenido del new FormData()porque sin ellos no se puede
                if (accion === 'crear') {
                    // crearemos un nuevo elemento
                    insertBD(infoContacto);
                    document.querySelector("#btn_click").value = "Enviando...";
                    document.querySelector("#btn_click").disabled = true;
                } else {
                    // editar el 
                    const idRegistro = document.querySelector('#id').value;
                    infoContacto.append('id', idRegistro);
                    actualizarRegistro(infoContacto);
                    document.querySelector("#btn_click").value = "Validando...";
                }
            }
        }
        // insertar en los datos en la base de datos via ajax
        function insertBD(datos) {
            // llamado a jax
            // crear el objecto
            const xhr = new XMLHttpRequest();
            // abrir la conexion
            xhr.open('POST', 'includes/models/modelo-contacto.php', true);
            // pasar los datos
            xhr.onload = function() {
                    if (this.status === 200) {
                        // console.log(JSON.parse(xhr.responseText));
                        // leemos la respuesta de PHP
                        const respuesta = JSON.parse(xhr.responseText);
                        // console.log(respuesta.empresa);
                        // inserta nuevo elemento a la 
                        const nuevoContacto = document.createElement('tr');
                        //alt + 96 =``
                        nuevoContacto.innerHTML = `
                        <td>${respuesta.datos.nombre}</td>
                        <td>${respuesta.datos.empresa}</td>
                        <td>${respuesta.datos.telefono}</td>
                        `;
                        // crear contenedor para los botones
                        const contenedorAcciones = document.createElement('td');
                        // crear el icono de editar
                        const iconoEditar = document.createElement('i');
                        iconoEditar.classList.add('fas', 'fa-pen-square');
                        // crear el enlace para editar
                        const btnEditar = document.createElement('a');
                        btnEditar.appendChild(iconoEditar);
                        btnEditar.href = `editar.php?id=${respuesta.datos.id_insertado}`;
                        btnEditar.classList.add('btn-editar', 'btn', 'a');
                        // agregarlo al padre
                        contenedorAcciones.appendChild(btnEditar);
                        // crear el icono de borrar
                        const iconoEliminar = document.createElement('i');
                        iconoEliminar.classList.add('fas', 'fa-trash-alt');
                        // crear boton de eleminar
                        const btnEliminar = document.createElement('button');
                        btnEliminar.appendChild(iconoEliminar);
                        // setAttribute agregar un atributo
                        btnEliminar.setAttribute('type', 'button');
                        btnEliminar.setAttribute('data-id', respuesta.datos.id_insertado);
                        btnEliminar.classList.add('btn', 'btn-borrar');
                        // agregarlo al padre
                        contenedorAcciones.appendChild(btnEliminar);
                        // agregar al tr
                        nuevoContacto.appendChild(contenedorAcciones);
                        // agregarlo con los contactos
                        listadoContactos.appendChild(nuevoContacto);
                        // Resetear el formulario
                        document.querySelector('form').reset();

                        // Mostrar la notificacion
                        notificaciones('Contacto Creado Correctamente', 'correcto');
                        // volver habilitar el boton de añadir
                        document.querySelector("#btn_click").value = "Añadir";
                        document.querySelector("#btn_click").disabled = false;

                        // Actualizar el número
                        numeroContactos();
                    }
                }
                // enviar datos
            xhr.send(datos);
        }

        function actualizarRegistro(datos) {
            // console.log(...datos);
            const xhr = new XMLHttpRequest();

            // abrir la conexión
            xhr.open('POST', 'includes/models/modelo-contacto.php', true);

            // leer la respuesta
            xhr.onload = function() {
                if (this.status === 200) {
                    const respuesta = JSON.parse(xhr.responseText);
                    // console.log(respuesta);

                    if (respuesta.respuesta === 'correcto') {
                        // mostrar notificación de Correcto
                        notificaciones('Contacto Editado Correctamente', 'correcto');
                        document.querySelector("#btn_click").value = "Guardando...";
                        document.querySelector("#btn_click").disabled = true;
                    } else {
                        // hubo un error
                        notificaciones('Hubo un error...', 'error');
                        document.querySelector("#btn_click").value = "Añadir";
                    }
                    // Después de 3 segundos redireccionar
                    setTimeout(() => {
                        window.location.href = 'index.php';
                    }, 2500);
                }
            }

            // enviar la petición
            xhr.send(datos);

        }
        // eliminar el contacto
        // e va a reportar a que elemento se le dio clic
        function eleminarContacto(e) {
            // parentElement vamos a ir del hijo al padre
            // console.log(e.target.parentElement.classList.contains('btn-borrar'));
            // ayudara a saber si existe esa clase en el elemento
            if (e.target.parentElement.classList.contains('btn-borrar')) {
                // tomar el id
                const id = e.target.parentElement.getAttribute('data-id');
                // console.log(id);
                //pregntar al usuario
                const respuesta = confirm('¿Estás Seguro (a) de Eliminar el contacto?')
                if (respuesta) {
                    // llamado a jax
                    // crear el objecto
                    const xhr = new XMLHttpRequest();
                    // abrir la conexion
                    xhr.open('GET', `includes/models/modelo-contacto.php?id=${id}&accion=borrar`, true); // usamos las `` para concatenas con php y eliminar el id
                    // leer datos
                    xhr.onload = function() {
                            if (this.status === 200) {
                                const resultado = JSON.parse(xhr.responseText);
                                // console.log(resultado);
                                if (resultado.respuesta == 'correcto') {
                                    // Eliminar el registro del DOM
                                    // console.log(e.target.parentElement.parentElement.parentElement);
                                    e.target.parentElement.parentElement.parentElement.remove();



                                    // mostrar Notificación
                                    notificaciones('Contacto eliminado', 'correcto');

                                    // Actualizar el número
                                    numeroContactos();
                                } else {
                                    // Mostramos una notificacion
                                    notificaciones('Hubo un error...', 'error');
                                }

                            }
                        }
                        // enviar la peticion
                    xhr.send();
                }
            }

        }
        // ocultar y mostrar notificacion
        function notificaciones(mensaje, clase) {
            const notificacion = document.createElement('div');
            notificacion.classList.add(clase, 'notificacion', 'sombra');
            notificacion.textContent = mensaje;
            // formulario
            fomularioContactos.insertBefore(notificacion, document.querySelector('form legend'));
            // ocultar y mostrar la notificacion
            // setTimeout espera cierto tiempo para ejecutar un codigo
            setTimeout(() => {
                notificacion.classList.add('visible');
                setTimeout(() => {
                    notificacion.classList.remove('visible');
                    setTimeout(() => {
                        notificacion.remove();
                    }, 500)
                }, 3000);
            }, 100);

            // 100 es una decima parte de un segundo
        }
        /** Buscador de registros */
        function buscarContactos(e) {
            // console.log(e.target.value);
            const expresion = new RegExp(e.target.value, "i"),
                registros = document.querySelectorAll('tbody tr');
            registros.forEach(registro => {
                registro.style.display = 'none';
                // console.log(registro);
                // console.log(registro.childNodes);
                // para recordar video 636 desde min 4
                // console.log(registro.childNodes[1].textContent.replace(/\s/g, " ").search(expresion) != -1);
                if (registro.childNodes[1].textContent.replace(/\s/g, " ").search(expresion) != -1) {
                    registro.style.display = 'table-row';
                }

                numeroContactos();
            })
        }
        /** Muestra el número de Contactos */
        function numeroContactos() {
            const totalContactos = document.querySelectorAll('tbody tr'),
                contenedorNumero = document.querySelector('.total-contactos span');
            // console.log(totalContactos.length);
            let total = 0;

            totalContactos.forEach(contacto => {
                // console.log(contacto.style.display);
                if (contacto.style.display === '' || contacto.style.display === 'table-row') {
                    total++;
                }
            });

            // console.log(total);
            contenedorNumero.textContent = total;
        }
    });
})();