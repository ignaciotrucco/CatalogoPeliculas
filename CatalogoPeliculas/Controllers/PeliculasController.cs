using System.Diagnostics;
using Microsoft.AspNetCore.Mvc;
using CatalogoPeliculas.Models;
using CatalogoPeliculas.Data;

namespace CatalogoPeliculas.Controllers;

public class PeliculasController : Controller
{
    private ApplicationDbContext _context;

    public PeliculasController(ApplicationDbContext context)
    {
        _context = context;
    }

    public IActionResult Peliculas()
    {
        return View();
    }

    public JsonResult ListadoDePeliculas(int? peliculasId)
    {
        var peliculas = _context.Pelicula.ToList();

        //preguntamos si el usuario ingreso un id para ver un ejercicio en particular
        if (peliculasId != null)
        {
            //filtra listado por id si es que lo pide el usuario
            peliculas = _context.Pelicula.Where(p => p.PeliculaId == peliculasId).ToList();
        }
        return Json(peliculas);
    }

    public JsonResult GuardarDatos(int PeliculasId, string Titulo, string Director, int Lanzamiento, bool Alquilada)
    {

        string resultado = "";

        //IF PARA VERIFICAR QUE INGRESE DATOS EN LOS INPUTS
        if (!string.IsNullOrEmpty(Titulo) && !string.IsNullOrEmpty(Director))
        {

            //CONVERTIMOS A MAYUSCULA
            Titulo = Titulo.ToUpper();
            Director = Director.ToUpper();


            if (PeliculasId == 0) //SI EL ID DE PELICULA NO EXISTE OSEA ES CERO AGREGAMOS UNA NUEVA PELICULA
            {

                //VERIFICAMOS QUE NO EXISTAN TITULO O DIRECTOR EN LA TABLA
                var existenDatos = _context.Pelicula.Where(e => e.Titulo == Titulo || e.Director == Director || e.AnioLanzamiento == Lanzamiento).Count();

                if (existenDatos == 0) //SI NO EXISTEN AGREGAMOS NUEVA PELICULA
                {
                    var nuevaPelicula = new Pelicula
                    {
                        Titulo = Titulo,
                        Director = Director,
                        AnioLanzamiento = Lanzamiento,
                        Alquilada = Alquilada
                    };
                    _context.Add(nuevaPelicula);
                    _context.SaveChanges();
                }
                else
                {
                    resultado = "NO SE PUEDE AGREGAR ESTA PELICULA PORQUE INGRESÓ DATOS EXISTENTES";
                }
            }
            else //SI EL ID DE PELICULAS YA EXISTE ESTO QUIERE DECIR QUE VAMOS A EDITAR
            {
                var peliculaEditar = _context.Pelicula.Where(p => p.PeliculaId == PeliculasId).SingleOrDefault();
                if (peliculaEditar != null)
                {
                    //BUSCAMOS EN LA TABLA QUE NO EXISTAN REGISTROS IGUALES PERO DE DISTINTOS IDS
                    var existePelicula = _context.Pelicula.Where(e => e.Titulo == Titulo && e.PeliculaId != PeliculasId
                    || e.Director == Director && e.PeliculaId != PeliculasId || e.AnioLanzamiento == Lanzamiento && e.PeliculaId != PeliculasId).Count();

                    if (existePelicula == 0) //QUIERE DECIR QUE NO EXISTE NINGUNO IGUAL ENTONCES PASAMOS AL EDITAR
                    {
                        peliculaEditar.Titulo = Titulo;
                        peliculaEditar.Director = Director;
                        peliculaEditar.AnioLanzamiento = Lanzamiento;
                        peliculaEditar.Alquilada = Alquilada;
                        _context.SaveChanges();
                    }
                    else
                    {
                        resultado = "NO SE PUEDE EDITAR ESTA PELICULA PORQUE INGRESÓ DATOS EXISTENTES";
                    }
                }
            }
        }
        else
        {
            resultado = "Debe ingresar datos en los inputs";
        }

        return Json(resultado);
    }

    public JsonResult EliminarPelicula(int PeliculaId)
    {
        string resultado = "";

        var eliminarPelicula = _context.Pelicula.Find(PeliculaId);

        if (eliminarPelicula.Alquilada)
        {
            resultado = "No se puede eliminar esta película porque está alquilada";
        }
        else
        {
            _context.Pelicula.Remove(eliminarPelicula);
            _context.SaveChanges();
            resultado = "Pelicula eliminada correctamente";
        }

        return Json(resultado);
    }
}