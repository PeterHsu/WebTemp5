using System;
using System.Collections.Generic;
using System.Data;
using System.Data.SqlClient;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using Dapper;
using Microsoft.Extensions.Options;
using Backend.Configuration;
using Dapper.Contrib.Extensions;
using Microsoft.Extensions.Logging;

namespace Backend.Controllers
{
    [Route("api/[controller]")]
    public class HttpStatusController : Controller
    {
        private readonly ILogger<CRUD1Controller> _logger;
        public HttpStatusController(ILogger<CRUD1Controller> logger)
        {
            _logger = logger;
        }

        // GET api/HttpStatus
        [HttpGet]
        public IActionResult Get()
        {
            return Ok("Hello");
        }

        [HttpGet("NoContent")]
        public IActionResult GetNoContent()
        {
            return NoContent();
        }

    }
}