using AuthenticationApi.Db;
using AuthenticationApi.Entities;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using System.Net;
using System.Web.Http;
using System.Web.Http.Description;

namespace AuthenticationApi.Controllers
{
    [ApiController]
    [System.Web.Http.Route("[controller]")]
    public class PublicationController : Controller
    {
        private AppDbContext db = new AppDbContext(new DbContextOptions<AppDbContext>());

        // GET: api/CollegeDetails  
        [Microsoft.AspNetCore.Mvc.HttpGet]
        [Microsoft.AspNetCore.Mvc.Route("publicationAll")]
        public IQueryable<Publication> PublicationsAll()
        {
            return db.Publications;
        }

        // GET: api/CollegeDetails/5  
        [Microsoft.AspNetCore.Mvc.HttpGet]
        [ResponseType(typeof(Publication))]
        [Microsoft.AspNetCore.Mvc.Route("publicationDetail/{id:Guid}")]
        public async Task<ActionResult> Publication(Guid id)
        {
            Publication publication = await db.Publications.FindAsync(id);
            if (publication == null)
            {
                return NotFound();
            }

            return Ok(publication);
        }

        // PUT: api/CollegeDetails/5  
        [Microsoft.AspNetCore.Mvc.HttpPut]
        [ResponseType(typeof(void))]
        [Microsoft.AspNetCore.Mvc.Route("PublicationUpdate/{id:Guid}")]
        public async Task<ActionResult> PublicationUpdate(Guid id, Publication publication)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            if (id != publication.Id)
            {
                return BadRequest();
            }

            db.Entry(publication).State = EntityState.Modified;

            try
            {
                await db.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!CollegeDetailExists(id))
                {
                    return NotFound();
                }
                else
                {
                    throw;
                }
            }

            return StatusCode((int)HttpStatusCode.NoContent);
        }

        // POST: api/CollegeDetails  
        [Microsoft.AspNetCore.Mvc.HttpPost]
        [ResponseType(typeof(Publication))]
        [Microsoft.AspNetCore.Mvc.Route("publicationPost")]
        public async Task<ActionResult> PublicationPost(Publication publication)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            db.Publications.Add(publication);
            await db.SaveChangesAsync();

            return Ok(publication);
        }

        // DELETE: api/CollegeDetails/5  
        [Microsoft.AspNetCore.Mvc.HttpDelete]
        [ResponseType(typeof(Publication))]
        [Microsoft.AspNetCore.Mvc.Route("publicationDelete/{id:Guid}")]
        public async Task<ActionResult> PublicationsDelete(Guid id)
        {
            Publication publication = await db.Publications.FindAsync(id);
            if (publication == null)
            {
                return NotFound();
            }

            db.Publications.Remove(publication);
            await db.SaveChangesAsync();

            return Ok(publication);
        }

        //public int CountAllPublications()
        //{
        //    return db.Publications.Count();
        //}

        //protected override void Dispose(bool disposing)
        //{
        //    if (disposing)
        //    {
        //        db.Dispose();
        //    }
        //    base.Dispose(disposing);
        //}

        private bool CollegeDetailExists(Guid id)
        {
            return db.Publications.Count(e => e.Id == id) > 0;
        }
    }
}
