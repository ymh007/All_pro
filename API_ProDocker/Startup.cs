using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Logging;
using Microsoft.Extensions.Options;
using API_ProDocker.Data;
using Microsoft.EntityFrameworkCore;
using System.IO;
using log4net.Repository;
using log4net.Config;
using log4net;
using API_ProDocker.DapperData;

namespace API_ProDocker
{
    public class Startup
    {
        public IConfiguration Configuration { get; }

        //public static ILoggerRepository repository { get; set; }
        public Startup(IConfiguration configuration)
        {
            Configuration = configuration;
            
        }
        public static class ServiceLocator
        {
            public static IServiceProvider Instance { get; set; }
        }


        // This method gets called by the runtime. Use this method to add services to the container.
        public void ConfigureServices(IServiceCollection services)
        {
            services.AddCors(option=> {
                option.AddPolicy("SignalrCore", policy => policy.AllowAnyOrigin()
                .AllowAnyHeader()
                .AllowAnyMethod().AllowCredentials());
            });
            services.AddSignalR();
            services.AddMvc().SetCompatibilityVersion(CompatibilityVersion.Version_2_1);
            services.AddDbContext<SchoolContext>(options =>
options.UseSqlServer(Configuration.GetConnectionString("DefaultConnection")));
            services.AddDbContext<PersonContext>();
            //services.AddTransient<IRepositoryBase<T>,RepositoryBase>();
        }

        // This method gets called by the runtime. Use this method to configure the HTTP request pipeline.
        public void Configure(IApplicationBuilder app, IHostingEnvironment env)
        {
            if (env.IsDevelopment())
            {
                app.UseDeveloperExceptionPage();
            }
            app.UseCors("SignalrCore");
            app.UseSignalR(routes =>
            {
                routes.MapHub<SignalrHubs>("/hubs");
            });
            //app.UseWebSockets();
            app.UseMvc();
            ServiceLocator.Instance = app.ApplicationServices;
        }
    }
}
