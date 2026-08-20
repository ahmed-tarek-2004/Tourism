using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace Tourism.Infrastructure.Migrations
{
    /// <inheritdoc />
    public partial class EditLineName : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Lines_Trips_tripId",
                table: "Lines");

            migrationBuilder.DropPrimaryKey(
                name: "PK_Lines",
                table: "Lines");

            migrationBuilder.RenameTable(
                name: "Lines",
                newName: "Routes");

            migrationBuilder.RenameIndex(
                name: "IX_Lines_tripId",
                table: "Routes",
                newName: "IX_Routes_tripId");

            migrationBuilder.AddPrimaryKey(
                name: "PK_Routes",
                table: "Routes",
                column: "Id");

            migrationBuilder.AddForeignKey(
                name: "FK_Routes_Trips_tripId",
                table: "Routes",
                column: "tripId",
                principalTable: "Trips",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Routes_Trips_tripId",
                table: "Routes");

            migrationBuilder.DropPrimaryKey(
                name: "PK_Routes",
                table: "Routes");

            migrationBuilder.RenameTable(
                name: "Routes",
                newName: "Lines");

            migrationBuilder.RenameIndex(
                name: "IX_Routes_tripId",
                table: "Lines",
                newName: "IX_Lines_tripId");

            migrationBuilder.AddPrimaryKey(
                name: "PK_Lines",
                table: "Lines",
                column: "Id");

            migrationBuilder.AddForeignKey(
                name: "FK_Lines_Trips_tripId",
                table: "Lines",
                column: "tripId",
                principalTable: "Trips",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);
        }
    }
}
