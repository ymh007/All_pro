using Microsoft.Extensions.Logging;
using Newtonsoft.Json;
using System;

namespace API_ProDocker.Common
{
    public class ControllerService
    {
        private static ILogger logger;



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
                //logger.LogInformation(e.Message);
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
