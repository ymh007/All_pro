using Microsoft.Owin;
using Microsoft.Owin.Hosting;
using Owin;
using System;
using System.Threading.Tasks;
using System.Web.Http;
using Unity;


namespace all_andy
{
    class Program
    {
       
        static void Main(string[] args)
        {

            using (WebApp.Start<Startup>("http://localhost:9000"))
            {
                Console.WriteLine("Press [enter] to quit...");
                Console.ReadLine();
            }

            Console.ReadKey();
        }
        static void D1()
        {

           
            UnityContainer container = new UnityContainer();
            container.RegisterType<IWaterTool, PressWater>();
            IPeople people = container.Resolve<VillPenple>();
            people.DrinkWater();
        }
    }

    public class Startup
    {
        public void Configuration(IAppBuilder app)
        {
            //app.Use<Middleware1>();
            //app.Use<Middleware2>();
            //app.Run(HandleRequest);
            //创建 Web API 的配置
            var config = new HttpConfiguration();
            // 启用标记路由
            config.MapHttpAttributeRoutes();
            // 默认的 Web API 路由
            config.Routes.MapHttpRoute(
                name: "DefaultApi",
                routeTemplate: "api/{controller}/{id}",
                defaults: new { id = RouteParameter.Optional }
            );
            // 将路由配置附加到 appBuilder
            app.UseWebApi(config);

        }

        static Task HandleRequest(IOwinContext context)
        {
            context.Response.ContentType = "text/plain";
            return context.Response.WriteAsync("Hello, world!");
        }
    }
}
