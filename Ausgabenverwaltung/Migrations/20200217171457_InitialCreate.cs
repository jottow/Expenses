using System;
using Microsoft.EntityFrameworkCore.Metadata;
using Microsoft.EntityFrameworkCore.Migrations;

namespace Ausgabenverwaltung.Migrations
{
    public partial class InitialCreate : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.CreateTable(
                name: "AusgabenTyp",
                columns: table => new
                {
                    AusgabenTypId = table.Column<int>(nullable: false)
                        .Annotation("SqlServer:ValueGenerationStrategy", SqlServerValueGenerationStrategy.IdentityColumn),
                    Name = table.Column<string>(type: "nvarchar(50)", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_AusgabenTyp", x => x.AusgabenTypId);
                });

            migrationBuilder.CreateTable(
                name: "Haushalt",
                columns: table => new
                {
                    HaushaltId = table.Column<int>(nullable: false)
                        .Annotation("SqlServer:ValueGenerationStrategy", SqlServerValueGenerationStrategy.IdentityColumn),
                    Name = table.Column<string>(type: "nvarchar(50)", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Haushalt", x => x.HaushaltId);
                });

            migrationBuilder.CreateTable(
                name: "Shop",
                columns: table => new
                {
                    ShopId = table.Column<int>(nullable: false)
                        .Annotation("SqlServer:ValueGenerationStrategy", SqlServerValueGenerationStrategy.IdentityColumn),
                    Name = table.Column<string>(type: "nvarchar(50)", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Shop", x => x.ShopId);
                });

            migrationBuilder.CreateTable(
                name: "User",
                columns: table => new
                {
                    UserId = table.Column<int>(nullable: false)
                        .Annotation("SqlServer:ValueGenerationStrategy", SqlServerValueGenerationStrategy.IdentityColumn),
                    Name = table.Column<string>(type: "nvarchar(50)", nullable: false),
                    HaushaltId = table.Column<int>(nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_User", x => x.UserId);
                    table.ForeignKey(
                        name: "FK_User_Haushalt_HaushaltId",
                        column: x => x.HaushaltId,
                        principalTable: "Haushalt",
                        principalColumn: "HaushaltId",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateTable(
                name: "Ausgaben",
                columns: table => new
                {
                    Id = table.Column<int>(nullable: false)
                        .Annotation("SqlServer:ValueGenerationStrategy", SqlServerValueGenerationStrategy.IdentityColumn),
                    Betrag = table.Column<double>(type: "float", nullable: false),
                    Datum = table.Column<DateTime>(type: "datetime", nullable: false),
                    Bemerkung = table.Column<string>(type: "nvarchar(100)", nullable: true),
                    AusgabenTypId = table.Column<int>(nullable: false),
                    UserId = table.Column<int>(nullable: false),
                    ShopId = table.Column<int>(nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Ausgaben", x => x.Id);
                    table.ForeignKey(
                        name: "Foreign Key Ausgaben AusgabenTyp",
                        column: x => x.AusgabenTypId,
                        principalTable: "AusgabenTyp",
                        principalColumn: "AusgabenTypId",
                        onDelete: ReferentialAction.Cascade);
                    table.ForeignKey(
                        name: "FK_Ausgaben_Shop_ShopId",
                        column: x => x.ShopId,
                        principalTable: "Shop",
                        principalColumn: "ShopId",
                        onDelete: ReferentialAction.Cascade);
                    table.ForeignKey(
                        name: "FK_Ausgaben_User_UserId",
                        column: x => x.UserId,
                        principalTable: "User",
                        principalColumn: "UserId",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.InsertData(
                table: "Haushalt",
                columns: new[] { "HaushaltId", "Name" },
                values: new object[] { 1, "Sophienstraße 83" });

            migrationBuilder.CreateIndex(
                name: "IX_Ausgaben_AusgabenTypId",
                table: "Ausgaben",
                column: "AusgabenTypId");

            migrationBuilder.CreateIndex(
                name: "IX_Ausgaben_ShopId",
                table: "Ausgaben",
                column: "ShopId");

            migrationBuilder.CreateIndex(
                name: "IX_Ausgaben_UserId",
                table: "Ausgaben",
                column: "UserId");

            migrationBuilder.CreateIndex(
                name: "IX_User_HaushaltId",
                table: "User",
                column: "HaushaltId");
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "Ausgaben");

            migrationBuilder.DropTable(
                name: "AusgabenTyp");

            migrationBuilder.DropTable(
                name: "Shop");

            migrationBuilder.DropTable(
                name: "User");

            migrationBuilder.DropTable(
                name: "Haushalt");
        }
    }
}
