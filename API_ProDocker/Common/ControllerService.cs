using Microsoft.Extensions.Logging;
using Newtonsoft.Json;
using System;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using log4net;
using log4net.Config;
using System.IO;
using Microsoft.AspNetCore.Hosting;

namespace API_ProDocker.Common
{
    public class ControllerService
    {
        private static ILog logger;
        
        static ControllerService()
        {
            if (logger == null)
            {
                var repository = LogManager.CreateRepository("NETCoreRepository");
                XmlConfigurator.Configure(repository, new FileInfo("log4net.config"));
                logger = LogManager.GetLogger(repository.Name, "InfoLogger");
            }
        }


        /// <summary>
        /// 控制器统一异常处理
        /// </summary>
        public static BaseView Run(Action action)
        {
            BaseView baseView = new BaseView();
            try
            {
                action();
                baseView.State = true;
                baseView.Message = "success.";
            }
            catch (Exception e)
            {
                baseView.State = false;
                baseView.Message = e.Message;
                logger.Error("error-------"+e.Message);
                //logger.Info("info---------"+e.Message);
                //logger.Debug("debug---------"+e.Message);
            }
            return baseView;
        }
    }

    public class BaseView
    {
        /// <summary>
        /// 状态
        /// </summary>
        public bool State { set; get; }
        /// <summary>
        /// 消息提示
        /// </summary>
        public string Message { set; get; }
        /// <summary>
        /// 数据
        /// </summary>
        [JsonProperty(NullValueHandling = NullValueHandling.Ignore)]
        public object Data { set; get; }
    }
}
