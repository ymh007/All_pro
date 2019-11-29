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
using System.Security.Cryptography;
using Microsoft.IdentityModel.Tokens;
using System.Text;
using Microsoft.AspNetCore.Http;

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
            services.AddLogging(loggingBuilder => {
                loggingBuilder.AddConfiguration(Configuration.GetSection("Logging"));
                loggingBuilder.AddConsole();
                loggingBuilder.AddDebug();
            });

            services.AddSignalR();
            services.AddMvc().SetCompatibilityVersion(CompatibilityVersion.Version_2_1);
            services.AddDbContext<SchoolContext>(options =>
options.UseSqlServer(Configuration.GetConnectionString("DefaultConnection")));
            services.AddDbContext<PersonContext>();
            //services.AddTransient<IRepositoryBase<T>,RepositoryBase>();
            RSA_Auth(services);
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

            // 添加健康检查路由地址
            app.Map("/api/health", (applicationBuilder) =>
            {

                applicationBuilder.Run(context =>
                {
                    IUserService userService = new UserService();
                    //执行代理
                    var serviceProxy = new ProxyDecorator<IUserService>();
                    IUserService user = serviceProxy.Create(userService, UserHandleEvent.beforeEvent,UserHandleEvent.afterEvent);  //
                     object  uName = user.GetMode();
                    context.Response.ContentType = "text/plain;charset=utf-8";
                    JsonResult result = new JsonResult(uName);
                    return context.Response.WriteAsync(result.Value.ToString(), Encoding.UTF8);
                });
            });



            //使用IdentityServer4
            //app.UseIdentityServer();

            //使用Cookie模块
            //app.UseCookieAuthentication(new CookieAuthenticationOptions
            //{
            //    AuthenticationScheme = IdentityServerConstants.ExternalCookieAuthenticationScheme,
            //    AutomaticAuthenticate = false,
            //    AutomaticChallenge = false
            //});

            ServiceLocator.Instance = app.ApplicationServices;
        }


        private void RSA_Auth(IServiceCollection services)
        {
            ////RSA：证书长度2048以上，否则抛异常
            ////配置AccessToken的加密证书
            //var rsa = new RSACryptoServiceProvider();
            ////从配置文件获取加密证书
            //rsa.ImportCspBlob(Convert.FromBase64String(Configuration["SigningCredential"]));
            ////配置IdentityServer4
            //services.AddSingleton<IClientStore, MyClientStore>();   //注入IClientStore的实现，可用于运行时校验Client
            //services.AddSingleton<IScopeStore, MyScopeStore>();    //注入IScopeStore的实现，可用于运行时校验Scope
            ////注入IPersistedGrantStore的实现，用于存储AuthorizationCode和RefreshToken等等，默认实现是存储在内存中，
            ////如果服务重启那么这些数据就会被清空了，因此可实现IPersistedGrantStore将这些数据写入到数据库或者NoSql(Redis)中
            //services.AddSingleton<IPersistedGrantStore, MyPersistedGrantStore>();
            //services.AddIdentityServer()
            //    .AddSigningCredential(new RsaSecurityKey(rsa));
            //.AddTemporarySigningCredential()   //生成临时的加密证书，每次重启服务都会重新生成
            //.AddInMemoryScopes(Config.GetScopes())    //将Scopes设置到内存中
            //.AddInMemoryClients(Config.GetClients())    //将Clients设置到内存中
        }
    }
}
