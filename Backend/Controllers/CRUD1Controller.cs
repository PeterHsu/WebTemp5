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
    public class CRUD1Controller : Controller
    {
        private readonly ConfigData _configData;
        private readonly ILogger<CRUD1Controller> _logger;
        private readonly IDbConnection _conn;
        public CRUD1Controller(IOptions<ConfigData> configData,ILogger<CRUD1Controller> logger, IDbConnection conn)
        {
            _configData = configData.Value;
            _logger = logger;
            _conn = conn;
        }

        // GET api/crud1
        [HttpGet]
        public IActionResult Get()
        {
            _logger.LogInformation("api/crud1, Get");
            _conn.ConnectionString = _configData.ConnectionString;
            return Ok(_conn.GetAll<RegionResult>());
        }

        [Table("Region")]
        class RegionResult
        {
            [ExplicitKey]
            public int Id { get; set; }
            public string RegionDescription { get; set; }
        }
    }
}