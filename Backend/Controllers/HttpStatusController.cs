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
        [HttpGet("OKText")]
        public IActionResult GetOKText()
        {
            // 200
            return Ok("Hello");
        }
        [HttpGet("OKJson")]
        public IActionResult GetOKJson()
        {
            // 200
            return Ok(new ReturnValue(){Message="Hello"});
        }

        [HttpGet("NoContent")]
        public IActionResult GetNoContent()
        {
            // 204
            return NoContent();
        }

        [HttpGet("NotFound")]
        public IActionResult GetNotFound()
        {
            // 404
            return NotFound();
        }

        [HttpGet("BadRequest")]
        public IActionResult GetBadRequest()
        {
            // 400
            return BadRequest();
        }

        [HttpGet("Exception")]
        public IActionResult GetException()
        {
            // 500
            throw new Exception("Raise Error");
        }

         [HttpGet("Accepted")]
        public IActionResult GetAccepted()
        {
            // 202
            return Accepted();
        }
        class ReturnValue
        {
            public string Message { get; set; }
        }

    }
}