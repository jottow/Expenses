using Ausgabenverwaltung.Models;
using Microsoft.EntityFrameworkCore;
using System.Collections.Generic;

namespace Ausgabenverwaltung.EF
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

        public static void SeedAusgabenTypes(this ModelBuilder modelBuilder)
        {
            IList<AusgabenTyp> ausgabenTypListe = new List<AusgabenTyp>()
            {
                new AusgabenTyp { AusgabenTypId = 1, Name = "Sonstige" },
                new AusgabenTyp { AusgabenTypId = 2, Name = "Lebensmitel" },
                new AusgabenTyp { AusgabenTypId = 3, Name = "Haushalt" },
                new AusgabenTyp { AusgabenTypId = 4, Name = "Büro" },
                new AusgabenTyp { AusgabenTypId = 5, Name = "Luxus" },
                new AusgabenTyp { AusgabenTypId = 6, Name = "Körperpflege" },
            };

            modelBuilder.Entity<AusgabenTyp>().HasData(
             ausgabenTypListe
             );
        }
        public static void SeedShops(this ModelBuilder modelBuilder)
        {
            IList<Shop> shopListe = new List<Shop>()
            {
                new Shop { ShopId = 1, Name = "Sonstige" },
                new Shop { ShopId = 2, Name = "REWE" },
                new Shop { ShopId = 3, Name = "Penny" },
                new Shop { ShopId = 4, Name = "Edeka" },
                new Shop { ShopId = 5, Name = "Lidl" },
                new Shop { ShopId = 6, Name = "Kaufland" },

            };

            modelBuilder.Entity<Shop>().HasData(
             shopListe
             );
        }
        public static void SeedUsers(this ModelBuilder modelBuilder)
        {
            IList<User> userListe = new List<User>()
            {
                new User { UserId = 1, Name = "Sonstige", HaushaltId=1},
                new User { UserId = 2, Name = "Ich",  HaushaltId=1},
            };

            modelBuilder.Entity<User>().HasData(userListe);
        }
    }
}
