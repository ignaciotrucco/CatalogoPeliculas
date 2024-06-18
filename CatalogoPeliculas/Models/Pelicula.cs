namespace CatalogoPeliculas.Models;

public class Pelicula 
{
    public int PeliculaId {get; set;}
    public string? Titulo {get; set;}
    public string? Director {get; set;}
    public int AnioLanzamiento {get; set;}
    public bool Alquilada {get; set;}
}