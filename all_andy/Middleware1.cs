using Microsoft.Owin;
using System;
using System.Collections.Generic;
using System.Text;
using System.Threading.Tasks;

namespace all_andy
{
    public class Middleware1 : OwinMiddleware
    {
        public Middleware1(OwinMiddleware next) : base(next)
        { }


        public override Task Invoke(IOwinContext context)
        {
            if (Next !=null && context.Request.Path.Value != "/m1/")
            {
                var msg = "Owin1";
                var msgBytes = Encoding.UTF8.GetBytes(msg);
                context.Response.ContentType = "text/html;charset=utf-8";
                context.Response.Write(msgBytes, 0, msgBytes.Length);
                //解答者告诉Server解答已经完毕,后续Middleware不需要处理
                return Next.Invoke(context);
            }
            //如果不是要处理的路径,那么交付后续Middleware处理
            return Task.FromResult(0);
        }
    }
    public class Middleware2 : OwinMiddleware
    {
        public Middleware2(OwinMiddleware next) : base(next)
        { }


        public override Task Invoke(IOwinContext context)
        {

            if (Next != null && context.Request.Path.Value!="/m2/")
            {
                var msg = "Owin2";
                var msgBytes = Encoding.UTF8.GetBytes(msg);
                context.Response.ContentType = "text/html;charset=utf-8";
                context.Response.Write(msgBytes, 0, msgBytes.Length);
                //解答者告诉Server解答已经完毕,后续Middleware不需要处理
                return Next.Invoke(context);
            }
            //如果不是要处理的路径,那么交付后续Middleware处理
            return Task.FromResult(0);
        }
    }
}
