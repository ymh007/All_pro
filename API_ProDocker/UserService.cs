using System;
using System.Collections.Generic;
using System.Linq;
using System.Reflection;
using System.Threading.Tasks;

namespace API_ProDocker
{


    public static class UserHandleEvent
    {
        public static void beforeEvent(MethodInfo methodInfo, object[] arges)
        {
            System.Diagnostics.Debug.WriteLine("方法执行前");
        }

        public static void afterEvent(MethodInfo methodInfo, object[] arges)
        {
            System.Diagnostics.Debug.WriteLine("执行后的事件");
        }
    }



    public interface IUserService
    {
        Task<string> GetUserName(string name);
         object  GetMode();
    }

    public class UserService : IUserService
    {
        public  object  GetMode()
        {
            return  new  
            {
                name = "join",
                age = 17,
                address = "solisd as joins roud ",
                desc = "mark is empty"
            };
        }

        public Task<string> GetUserName(string name)
        {
            return Task.FromResult("my name is " + name);
        }
    }
}
