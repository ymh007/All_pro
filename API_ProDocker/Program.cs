using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Threading.Tasks;
using API_ProDocker.Data; 
using Microsoft.AspNetCore;
using Microsoft.AspNetCore.Hosting;


namespace API_ProDocker
{
    public class Program
    {
        public static void Main(string[] args)
        {
            CreateWebHostBuilder(args).Run();
            //var host = CreateWebHostBuilder(args);
            //using (var scope = host.Services.CreateScope())
            //{
            //    var services = scope.ServiceProvider;
            //    try
            //    {
            //        var context = services.GetRequiredService<SchoolContext>();
            //        DbInitializer.Initialize(context);
            //    }
            //    catch (Exception ex)
            //    {
            //        var logger = services.GetRequiredService<ILogger<Program>>();
            //        logger.LogError(ex, "An error occurred while seeding the database.");
            //    }
            //}
            //host.Run();
        }


        public static IWebHost CreateWebHostBuilder(string[] args) =>
        WebHost.CreateDefaultBuilder(args)
        //.UseUrls("http://10.23.80.87:5000")
        .UseStartup<Startup>()
        //.ConfigureLogging((hostContext, logging) =>
        //{
        //    logging.AddFilter("System", LogLevel.Warning);
        //    logging.AddFilter("Microsoft", LogLevel.Warning);
        //    logging.AddLog4Net();
        //})
        .Build();


    }
}
