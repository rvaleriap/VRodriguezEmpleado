using Microsoft.AspNetCore.Cors;
using Microsoft.AspNetCore.Mvc;

namespace PL.Controllers
{
    public class EstadoController : Controller
    {
        [EnableCors("API")]
        [HttpGet]
        [Route("api/Estado/GetAll")]
        public ActionResult GetAll()
        {
            ML.Result result = BL.Estado.GetAll();
            if (result.Correct)
            {
                return Ok(result);
            }
            else
            {
                return NotFound();
            }
        }
    }
}
