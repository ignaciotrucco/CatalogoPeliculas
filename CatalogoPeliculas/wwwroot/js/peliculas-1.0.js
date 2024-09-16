window.onload = ListadoDePeliculas();

function ListadoDePeliculas() {
    $.ajax({
        url: '../../Peliculas/ListadoDePeliculas',
        data: {},
        type: 'POST',
        dataType: 'json',
        success: function (peliculas) {

            $("#ModalPeliculas").modal("hide");
            LimpiarModal();

            let contenidoTabla = ``;

            $.each(peliculas, function (index, pelicula) {
                let alquiladaCheckbox;
                
                if (pelicula.alquilada) {
                    alquiladaCheckbox = '<input type="checkbox" checked disabled>';
                }
                else {
                   alquiladaCheckbox = '<input type="checkbox" disabled>'; 
                }
            

                contenidoTabla += `
                    <tr>
                        <td>${alquiladaCheckbox}</td>
                        <td>${pelicula.titulo}</td>
                        <td>${pelicula.director}</td>
                        <td>${pelicula.anioLanzamiento}</td>
                        <td>
                            <button type="button" class="btn btn-primary" onclick="ModalEditar(${pelicula.peliculaId})">Editar</button>
                        </td>
                        <td>
                            <button type="button" class="btn btn-danger" onclick="EliminarPelicula(${pelicula.peliculaId})">Eliminar</button>
                        </td>
                    </tr>
                `;
            });
            document.getElementById("tbody-peliculas").innerHTML = contenidoTabla;

        },
        // código a ejecutar si la petición falla;
        // son pasados como argumentos a la función
        // el objeto de la petición en crudo y código de estatus de la petición
        error: function (xhr, status) {
            console.log('Disculpe, existió un problema al cargar el listado');
        }
    });
};

function LimpiarModal() {
    document.getElementById("tituloPelicula").value = "";
    document.getElementById("directorPelicula").value = "";
    document.getElementById("anioPelicula").value = null;
    document.getElementById("alquilada").checked = false;
}

function ModalNuevaPelicula() {
    $("#TituloModalPeliculas").text("Nueva Pelicula");
}

function GuardarDatos(){
    
    let peliculaId = document.getElementById("PeliculaId").value;
    let titulo = document.getElementById("tituloPelicula").value;
    let director = document.getElementById("directorPelicula").value;
    let anioLanzamiento = document.getElementById("anioPelicula").value;
    let alquilada = document.getElementById("alquilada").checked;

    console.log(peliculaId + " - " + titulo + " - " + director + " - " + anioLanzamiento + " - " + alquilada);

    $.ajax({
        url: '../../Peliculas/GuardarDatos',
        data: {PeliculasId: peliculaId, Titulo: titulo, Director: director, Lanzamiento: anioLanzamiento, Alquilada: alquilada},
        type: 'POST',
        dataType: 'json',
        success: function (resultado) {
            if(resultado != "") {
                alert(resultado)
            }
            ListadoDePeliculas();

        },
        // código a ejecutar si la petición falla;
        // son pasados como argumentos a la función
        // el objeto de la petición en crudo y código de estatus de la petición
        error: function (xhr, status) {
            console.log('Disculpe, existió un problema al cargar el listado');
        }
    });
}

function ModalEditar(peliculaId) {

    $.ajax({
        // la URL para la petición
        url: '../../Peliculas/ListadoDePeliculas',
        // la información a enviar
        // (también es posible utilizar una cadena de datos)
        data: { peliculasId: peliculaId },
        // especifica si será una petición POST o GET
        type: 'POST',
        // el tipo de información que se espera de respuesta
        dataType: 'json',
        // código a ejecutar si la petición es satisfactoria;
        // la respuesta es pasada como argumento a la función
        success: function (peliculas) {

            let pelicula = peliculas[0];

            document.getElementById("PeliculaId").value = peliculaId
            $("#TituloModalPeliculas").text("Editar Pelicula");
            document.getElementById("tituloPelicula").value = pelicula.titulo;
            document.getElementById("directorPelicula").value = pelicula.director;
            document.getElementById("anioPelicula").value = pelicula.anioLanzamiento;
            document.getElementById("alquilada").checked = pelicula.alquilada;
            $("#ModalPeliculas").modal("show");

        },

        // código a ejecutar si la petición falla;
        // son pasados como argumentos a la función
        // el objeto de la petición en crudo y código de estatus de la petición
        error: function (xhr, status) {
            console.log('Disculpe, existió un problema al cargar el listado');
        }
    });

}

// function ValidacionEliminarPelicula(peliculaId) {
//     let siElimina = confirm("¿Esta seguro que desea eliminar esta pelicula?");
//     if(siElimina == true) {
//         EliminarPelicula(peliculaId);
//     }
// }

function EliminarPelicula(peliculaId) 
{
    let alquilada = document.getElementById("alquilada").checked;

    let siEliminar = confirm("¿Esta seguro que desea eliminar esta pelicula?");
    if(siEliminar == true) {
        $.ajax({
            // la URL para la petición
            url: '../../Peliculas/EliminarPelicula',
            // la información a enviar
            // (también es posible utilizar una cadena de datos)
            data: { PeliculaId: peliculaId, Alquilada: alquilada},
            // especifica si será una petición POST o GET
            type: 'POST',
            // el tipo de información que se espera de respuesta
            dataType: 'json',
            // código a ejecutar si la petición es satisfactoria;
            // la respuesta es pasada como argumento a la función
            success: function (resultado) {

                if (resultado != "") {
                    alert(resultado);
                }
    
            ListadoDePeliculas();
    
            },
    
            // código a ejecutar si la petición falla;
            // son pasados como argumentos a la función
            // el objeto de la petición en crudo y código de estatus de la petición
            error: function (xhr, status) {
                console.log('Disculpe, existió un problema al cargar el listado');
            }
        });
    }
    else {
        ListadoDePeliculas();
    }

}