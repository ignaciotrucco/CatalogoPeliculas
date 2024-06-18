using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace CatalogoPeliculas.Migrations
{
    /// <inheritdoc />
    public partial class NuevoCampoPeliculas : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<bool>(
                name: "Alquilada",
                table: "Pelicula",
                type: "bit",
                nullable: false,
                defaultValue: false);
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "Alquilada",
                table: "Pelicula");
        }
    }
}
