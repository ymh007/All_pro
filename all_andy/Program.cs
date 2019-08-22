using Microsoft.Owin;
using Microsoft.Owin.Hosting;
using Owin;
using System;
using System.Collections.Generic;
using System.Threading.Tasks;
using System.Web.Http;
using Unity;
using System.Data.SqlClient;
using System.Data;
using System.IO;
using Microsoft.Exchange.WebServices.Data;
using Microsoft.Exchange.WebServices.Autodiscover;
using System.Net;

namespace all_andy
{
    class Program
    {

        static void Main(string[] args)
        {

            //using (WebApp.Start<Startup>("http://localhost:9000"))
            //{
            //    Console.WriteLine("Press [enter] to quit...");
            //    Console.ReadLine();
            //}

            // Console.WriteLine(DataProcess.FindData().Count);

            //System.IO.File.AppendAllText("e:\\log.txt", DateTime.Now.ToString() + "\r\n");
            //ProcessJsonData();
            Security.SetCertificatePolicy();

            ExchangeService service = new ExchangeService(ExchangeVersion.Exchange2013_SP1);
            service.Credentials = new WebCredentials("allorthing@163.com", "wasdwasd");
            service.UseDefaultCredentials = true;
            service.TraceEnabled = true;
            service.EnableScpLookup = true;
            service.AutodiscoverUrl("allorthing@163.com", RedirectionUrlValidationCallback);




            Console.ReadKey();
        }


        private static bool RedirectionUrlValidationCallback(string redirectionUrl)
        {
            // The default for the validation callback is to reject the URL.
            bool result = false;
            Uri redirectionUri = new Uri(redirectionUrl);
            // Validate the contents of the redirection URL. In this simple validation
            // callback, the redirection URL is considered valid if it is using HTTPS
            // to encrypt the authentication credentials. 
            if (redirectionUri.Scheme == "https")
            {
                result = true;
            }
            return result;
        }






        static void D1()
        {


            UnityContainer container = new UnityContainer();
            container.RegisterType<IWaterTool, PressWater>();
            IPeople people = container.Resolve<VillPenple>();
            people.DrinkWater();
        }


        static object ProcessJsonData()
        {
            List<jsonMode> result = new List<jsonMode>();
            string jsonDataPath = @"E:\jsonData.txt";
            result = Newtonsoft.Json.JsonConvert.DeserializeObject<List<jsonMode>>(System.IO.File.ReadAllText(jsonDataPath));
            var column = new Dictionary<string, string>() {
                    {"汇报编码","reportCode" },
                    {"标题","title" },
                    {"创建时间","createName" },
                    {"接受人","receiveName" },
                    {"创建人","createTime" },
                    {"转发人","forwardDetails" },
                    {"是否读取","isRead" },
                   {"内容","content" }
                };
            var excel = new ExcelService();
            excel.CreateSheet("工作汇报数据", column, result);
            var file = excel.GetFileStream();
            using (FileStream fs = new FileStream(@"E:\工作汇报数据.xls", FileMode.OpenOrCreate, FileAccess.Write))
            {
                byte[] buffer = file.ToArray();//转化为byte格式存储
                fs.Write(buffer, 0, buffer.Length);
                fs.Flush();
                buffer = null;
            }
            return result;
        }

        private void T1()
        {
            string sql = "";
            DataSet data = new DataSet();
            string connectionString = "Server=.;User ID=sa;Database=TestDb;Password=123456;";
            using (SqlConnection connection = new SqlConnection(connectionString))
            {
                using (SqlCommand command = new SqlCommand(sql, connection))
                {
                    command.CommandType = CommandType.Text;
                    SqlDataAdapter adapter = new SqlDataAdapter(command);
                    adapter.Fill(data);
                }
            }
        }

    }
    public class jsonMode
    {
        public string reportCode { get; set; }
        public string content { get; set; }
        public string title { get; set; }

        public string receiverDetails { get; set; }
        public string copyDetails { get; set; }
        public string forwardDetails { get; set; }
        public bool? isRead { get; set; }
        public string createName { get; set; }
        public string receiveName { get; set; }
        public DateTime? createTime { get; set; }


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

    }
}
