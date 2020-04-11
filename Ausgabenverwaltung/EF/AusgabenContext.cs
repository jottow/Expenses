using Ausgabenverwaltung.Models;
using Microsoft.EntityFrameworkCore;

namespace Ausgabenverwaltung.EF
{
    public class AusgabenContext:DbContext
    {
        public DbSet<Ausgaben> Ausgaben { get; set; }
        public DbSet<AusgabenTyp> AusgabenTyp { get; set; }
        public DbSet<User> User { get; set; }

        public DbSet<User> Haushalt { get; set; }
        public DbSet<Shop> Shop { get; set; }


        public AusgabenContext(DbContextOptions<AusgabenContext> options) : base(options)
        {

        }
        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
          
            modelBuilder.Entity<Ausgaben>()
                .HasOne(at => at.AusgabenTyp)
                .WithMany(a=>a.Ausgaben)
                .HasForeignKey(at=>at.AusgabenTypId)
                .HasConstraintName("Foreign Key Ausgaben AusgabenTyp");


            modelBuilder.SeedHaushalt();
            modelBuilder.SeedAusgabenTypes();
            modelBuilder.SeedShops();
            modelBuilder.SeedUsers();
        }
    }
}
