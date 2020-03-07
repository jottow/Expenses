using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Ausgabenverwaltung.Models;

namespace Ausgabenverwaltung.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class AusgabenTypController : ControllerBase
    {
        private readonly AusgabenContext _context;

        public AusgabenTypController(AusgabenContext context)
        {
            _context = context;
        }

        // GET: api/AusgabenTyp
        [HttpGet]
        public async Task<ActionResult<IEnumerable<AusgabenTyp>>> GetAusgabenTyp()
        {
            return await _context.AusgabenTyp.ToListAsync();
        }

        // GET: api/AusgabenTyp/5

        [HttpGet("{id}")]
        public async Task<ActionResult<AusgabenTyp>> GetAusgabenTyp(int id)
        {
            var ausgabenTyp = await _context.AusgabenTyp.FindAsync(id);

            if (ausgabenTyp == null)
            {
                return NotFound();
            }

            return ausgabenTyp;
        }

        // PUT: api/AusgabenTyp/5
        [HttpPut("{id}")]
        public async Task<IActionResult> PutAusgabenTyp(int id, AusgabenTyp ausgabenTyp)
        {
            if (id != ausgabenTyp.AusgabenTypId)
            {
                return BadRequest();
            }

            _context.Entry(ausgabenTyp).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!AusgabenTypExists(id))
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

        // POST: api/AusgabenTyp
        [HttpPost]
        public async Task<ActionResult<AusgabenTyp>> PostAusgabenTyp(AusgabenTyp ausgabenTyp)
        {
            _context.AusgabenTyp.Add(ausgabenTyp);
            await _context.SaveChangesAsync();

            return CreatedAtAction("GetAusgabenTyp", new { id = ausgabenTyp.AusgabenTypId }, ausgabenTyp);
        }

        // DELETE: api/AusgabenTyp/5
        [HttpDelete("{id}")]
        public async Task<ActionResult<AusgabenTyp>> DeleteAusgabenTyp(int id)
        {
            var ausgabenTyp = await _context.AusgabenTyp.FindAsync(id);
            if (ausgabenTyp == null)
            {
                return NotFound();
            }

            _context.AusgabenTyp.Remove(ausgabenTyp);
            await _context.SaveChangesAsync();

            return ausgabenTyp;
        }

        private bool AusgabenTypExists(int id)
        {
            return _context.AusgabenTyp.Any(e => e.AusgabenTypId == id);
        }
    }
}
