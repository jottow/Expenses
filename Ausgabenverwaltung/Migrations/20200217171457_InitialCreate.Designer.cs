﻿// <auto-generated />
using System;
using Ausgabenverwaltung.EF;
using Ausgabenverwaltung.Models;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Infrastructure;
using Microsoft.EntityFrameworkCore.Metadata;
using Microsoft.EntityFrameworkCore.Migrations;

namespace Ausgabenverwaltung.Migrations
{
    [DbContext(typeof(AusgabenContext))]
    [Migration("20200217171457_InitialCreate")]
    partial class InitialCreate
    {
        protected override void BuildTargetModel(ModelBuilder modelBuilder)
        {
#pragma warning disable 612, 618
            modelBuilder
                .HasAnnotation("ProductVersion", "2.2.6-servicing-10079")
                .HasAnnotation("Relational:MaxIdentifierLength", 128)
                .HasAnnotation("SqlServer:ValueGenerationStrategy", SqlServerValueGenerationStrategy.IdentityColumn);

            modelBuilder.Entity("Ausgabenverwaltung.Models.Ausgaben", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd()
                        .HasAnnotation("SqlServer:ValueGenerationStrategy", SqlServerValueGenerationStrategy.IdentityColumn);

                    b.Property<int>("AusgabenTypId");

                    b.Property<string>("Bemerkung")
                        .HasColumnType("nvarchar(100)");

                    b.Property<double>("Betrag")
                        .HasColumnType("float");

                    b.Property<DateTime>("Datum")
                        .HasColumnType("datetime");

                    b.Property<int>("ShopId");

                    b.Property<int>("UserId");

                    b.HasKey("Id");

                    b.HasIndex("AusgabenTypId");

                    b.HasIndex("ShopId");

                    b.HasIndex("UserId");

                    b.ToTable("Ausgaben");
                });

            modelBuilder.Entity("Ausgabenverwaltung.Models.AusgabenTyp", b =>
                {
                    b.Property<int>("AusgabenTypId")
                        .ValueGeneratedOnAdd()
                        .HasAnnotation("SqlServer:ValueGenerationStrategy", SqlServerValueGenerationStrategy.IdentityColumn);

                    b.Property<string>("Name")
                        .IsRequired()
                        .HasColumnType("nvarchar(50)");

                    b.HasKey("AusgabenTypId");

                    b.ToTable("AusgabenTyp");
                });

            modelBuilder.Entity("Ausgabenverwaltung.Models.Haushalt", b =>
                {
                    b.Property<int>("HaushaltId")
                        .ValueGeneratedOnAdd()
                        .HasAnnotation("SqlServer:ValueGenerationStrategy", SqlServerValueGenerationStrategy.IdentityColumn);

                    b.Property<string>("Name")
                        .IsRequired()
                        .HasColumnType("nvarchar(50)");

                    b.HasKey("HaushaltId");

                    b.ToTable("Haushalt");

                    b.HasData(
                        new
                        {
                            HaushaltId = 1,
                            Name = "Sophienstraße 83"
                        });
                });

            modelBuilder.Entity("Ausgabenverwaltung.Models.Shop", b =>
                {
                    b.Property<int>("ShopId")
                        .ValueGeneratedOnAdd()
                        .HasAnnotation("SqlServer:ValueGenerationStrategy", SqlServerValueGenerationStrategy.IdentityColumn);

                    b.Property<string>("Name")
                        .IsRequired()
                        .HasColumnType("nvarchar(50)");

                    b.HasKey("ShopId");

                    b.ToTable("Shop");
                });

            modelBuilder.Entity("Ausgabenverwaltung.Models.User", b =>
                {
                    b.Property<int>("UserId")
                        .ValueGeneratedOnAdd()
                        .HasAnnotation("SqlServer:ValueGenerationStrategy", SqlServerValueGenerationStrategy.IdentityColumn);

                    b.Property<int>("HaushaltId");

                    b.Property<string>("Name")
                        .IsRequired()
                        .HasColumnType("nvarchar(50)");

                    b.HasKey("UserId");

                    b.HasIndex("HaushaltId");

                    b.ToTable("User");
                });

            modelBuilder.Entity("Ausgabenverwaltung.Models.Ausgaben", b =>
                {
                    b.HasOne("Ausgabenverwaltung.Models.AusgabenTyp", "AusgabenTyp")
                        .WithMany("Ausgaben")
                        .HasForeignKey("AusgabenTypId")
                        .HasConstraintName("Foreign Key Ausgaben AusgabenTyp")
                        .OnDelete(DeleteBehavior.Cascade);

                    b.HasOne("Ausgabenverwaltung.Models.Shop", "Shop")
                        .WithMany("Ausgaben")
                        .HasForeignKey("ShopId")
                        .OnDelete(DeleteBehavior.Cascade);

                    b.HasOne("Ausgabenverwaltung.Models.User", "User")
                        .WithMany("Ausgaben")
                        .HasForeignKey("UserId")
                        .OnDelete(DeleteBehavior.Cascade);
                });

            modelBuilder.Entity("Ausgabenverwaltung.Models.User", b =>
                {
                    b.HasOne("Ausgabenverwaltung.Models.Haushalt", "Haushalt")
                        .WithMany("User")
                        .HasForeignKey("HaushaltId")
                        .OnDelete(DeleteBehavior.Cascade);
                });
#pragma warning restore 612, 618
        }
    }
}
