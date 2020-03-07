using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Threading.Tasks;

namespace Ausgabenverwaltung.Models
{
    public class Shop
    {
        [Key]
        public int ShopId{ get; set; }

        [Required]
        [Column(TypeName = "nvarchar(50)")]
        public string Name { get; set; }
        public ICollection<Ausgaben> Ausgaben { get; set; }
    }
}
