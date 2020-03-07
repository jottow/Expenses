using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Ausgabenverwaltung.Models
{
    public static class ModelBuilderExtensions
    {
        public static void SeedHaushalt(this ModelBuilder modelBuilder)
        {
            modelBuilder.Entity<Haushalt>().HasData(
                new Haushalt
                {
                    HaushaltId = 1,
                    Name = "Sophienstraße 83"
                }
             );
        }
    }
}
