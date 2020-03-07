using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Threading.Tasks;

namespace Ausgabenverwaltung.Models
{
    public class Ausgaben
    {
        [Key]
        public int Id { get; set; }
    
        [Required]
        [Column(TypeName = "float")]
        public double Betrag { get; set; }

        [Required]
        [Column(TypeName = "datetime")]
        public DateTime Datum { get; set; }

       [Column(TypeName = "nvarchar(100)")]
        public string Bemerkung { get; set; }

        public AusgabenTyp AusgabenTyp { get; set; }
        public int AusgabenTypId { get; set; }

        public User User { get; set; }

        public int UserId { get; set; }

        public Shop Shop { get; set; }

        public int ShopId { get; set; }
    }
}
