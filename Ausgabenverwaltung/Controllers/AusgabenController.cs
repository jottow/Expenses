using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Ausgabenverwaltung.Models;
using Ausgabenverwaltung.EF;

namespace Ausgabenverwaltung.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class AusgabenController : ControllerBase
    {
        private readonly AusgabenContext _context;

        public AusgabenController(AusgabenContext context)
        {
            _context = context;
        }

        // GET: api/Ausgaben
        [HttpGet]
        public async Task<ActionResult<IEnumerable<Ausgaben>>> GetAusgaben()
        {
            var ausgaben = await _context.Ausgaben.ToListAsync();
            ausgaben.Sort((x, y) => y.Datum.CompareTo(x.Datum)); //Abwärtssortierung
            return ausgaben;
        }

        // GET: api/Ausgaben/5
        [HttpGet("{id}")]
        public async Task<ActionResult<Ausgaben>> GetAusgaben(int id)
        {
            var ausgaben = await _context.Ausgaben.FindAsync(id);

            if (ausgaben == null)
            {
                return NotFound();
            }

            return ausgaben;
        }

        // PUT: api/Ausgaben/5
        [HttpPut("{id}")]
        public async Task<IActionResult> PutAusgaben(int id, Ausgaben ausgaben)
        {
            if (id != ausgaben.Id)
            {
                return BadRequest();
            }

            _context.Entry(ausgaben).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!AusgabenExists(id))
                {
                    return NotFound();
                }
                else
                {
                    throw;
                }
            }

            return NoContent();
        }

        // POST: api/Ausgaben
        [HttpPost]
        public async Task<ActionResult<Ausgaben>> PostAusgaben(Ausgaben ausgaben)
        {
           ausgaben.Datum = ausgaben.Datum.AddDays(1);
            _context.Ausgaben.Add(ausgaben);
            await _context.SaveChangesAsync();

            return CreatedAtAction("GetAusgaben", new { id = ausgaben.Id }, ausgaben);
        }

        // DELETE: api/Ausgaben/5
        [HttpDelete("{id}")]
        public async Task<ActionResult<Ausgaben>> DeleteAusgaben(int id)
        {
            var ausgaben = await _context.Ausgaben.FindAsync(id);
            if (ausgaben == null)
            {
                return NotFound();
            }

            _context.Ausgaben.Remove(ausgaben);
            await _context.SaveChangesAsync();

            return ausgaben;
        }

        private bool AusgabenExists(int id)
        {
            return _context.Ausgaben.Any(e => e.Id == id);
        }
    }
}
