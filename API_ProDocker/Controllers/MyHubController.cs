using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.SignalR;

namespace API_ProDocker.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class MyHubController : ControllerBase
    {
        private IHubContext<SignalrHubs> hubContext;
        public MyHubController(IHubContext<SignalrHubs> _hubContext)
        {
            hubContext = _hubContext;
        }

        /// <summary>
        /// 单个connectionid推送
        /// </summary>
        /// <param name="groups"></param>
        /// <returns></returns>
        [HttpPost("AnyOne")]
        public IActionResult AnyOne()
        {
            //if (groups != null && groups.Any())
            //{
            //    var ids = groups.Select(c => c.ShopId);
            //    var list = SignalrGroups.UserGroups.Where(c => ids.Contains(c.ShopId));
            //    foreach (var item in list)
            //        hubContext.Clients.Client(item.ConnectionId).InvokeAsync("AnyOne", $"{item.ConnectionId}: {item.Content}");
            //}
            return Ok();
        }

        /// <summary>
        /// 全部推送
        /// </summary>
        /// <param name="message"></param>
        /// <returns></returns>
        [HttpGet("EveryOne")]
        public IActionResult EveryOne(string message)
        {
            //hubContext.Clients.All.InvokeAsync("EveryOne", $"{message}");
            return Ok();
        }



    }
}