using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using System.Web.Http;
namespace all_andy
{
    public class MyApiController : ApiController
    {
        // GET api
        public IHttpActionResult Get(string id)
        {
            return this.Ok(DateTime.Now.ToString());
        }
        // PUT api
        public void Put(int id, string value)
        {
        }
        // DELETE api
        public void Delete(int id)
        {
        }
    }
}
