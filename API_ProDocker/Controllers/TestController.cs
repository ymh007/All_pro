using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Net.NetworkInformation;
using System.Threading.Tasks;
using API_ProDocker.Common;
using API_ProDocker.Data;
using API_ProDocker.Models;
using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Logging;

namespace API_ProDocker.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class TestController : ControllerBase
    {
        ILogger logger;
        SchoolContext context = null;
        PersonContext sqlitecontext = null;
        IHostingEnvironment ihostingEnvironment = null;
        public TestController(SchoolContext _context,PersonContext _sqlitecontext, IHostingEnvironment _ihostingEnvironment, ILogger<ControllerService> _logger)
        {
            context = _context;
            sqlitecontext = _sqlitecontext;
            ihostingEnvironment = _ihostingEnvironment;
            logger = _logger;
        }

        

        [HttpGet]
        public ActionResult<IEnumerable<string>> Get()
        {
            return new string[] { "机器名称", Environment.MachineName };
        }
        [HttpGet("{get}")]
        public ActionResult<IEnumerable<string>> MyCore()
        {
            List<object> result = new List<object>();
            result.Add(new
            {
                id = Guid.NewGuid().ToString(),
                name = "andy",
                phone = "27362812323",
            });
            return this.Ok(result);
        }
        [HttpGet("get1")]
        public ActionResult<IEnumerable<string>> MyCore1()
        {
            return this.Ok("now time : " + DateTime.Now.ToString("yyyy-MM-dd HH:mm:ss"));
        }

        [HttpGet("LoadData")]
        public ActionResult LoadData()
        {

            List<MeetingMaterialAuthority> student = context.MeetingMaterialAuthoritys.ToList<MeetingMaterialAuthority>();
            return this.Ok(student);
        }

        [HttpGet("ip")]
        public ActionResult GetIP()
        {
            string result = "";
            NetworkInterface.GetAllNetworkInterfaces()
           .SelectMany(i => i.GetIPProperties().UnicastAddresses)
           .Select(a => a.Address)
           //.Where(a => a.IsIPv6LinkLocal)
           .ToList()
           .ForEach(ip => result+= $"IP: {ip}, ScopeId: {ip.ScopeId} \r" );
            return this.Ok(result);
        }


        [HttpGet("GetSqliteData")]
        public ActionResult GetData()
        {
            String basePath1 = AppContext.BaseDirectory;
            String basePath2 = Path.GetDirectoryName(typeof(Program).Assembly.Location);
            string basePath = ihostingEnvironment.WebRootPath;
            List<Person> person = sqlitecontext.Persons.ToList<Person>();
            return this.Ok(person);
        }
        [HttpGet("log")]
        public ActionResult Log()
        {
            var result = ControllerService.Run(() =>
            {
                logger.LogInformation("测试错误信息1111111111");
                logger.LogError("测试错误信息");
                logger.Log(LogLevel.Error, "xxxxxxxxxxasdas阿斯顿撒旦撒");
            });
            return this.Ok(result);
        }
    }
}