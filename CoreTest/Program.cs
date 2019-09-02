using System;
using System.Collections.Generic;
using System.ComponentModel;
using System.Data;
using System.Data.SqlClient;
using System.IO;
using System.Reflection;
using System.Runtime.InteropServices;
namespace CoreTest
{
    class Program
    {
        static void Main(string[] args)
        {
            #region ---test
            ////TestMain tm = new TestMain();
            ////Console.WriteLine(tm.Test("5>2&&(3==3||3>4)"));
            //int a = 234;
            //char [] carray = a.ToString().ToCharArray();
            //for (int i = 0; i < carray.Length; i++)
            //{
            //    Console.WriteLine(carray[i]);
            //} 
            //DateTime start = DateTime.Parse("2019-04-03 15:00:00");
            //DateTime end = DateTime.Parse("2019-04-02 14:59:01");
            //TimeSpan ts = start.Subtract(end);
            //int a =(int)ts.TotalMinutes;
            //Console.WriteLine("时间间隔分钟数："+a);
            //Console.Write(ts);
            //getData();
            //MemInfo networkInfo = ServerConfig.ReadMemInfo();
            //int cpu = ServerConfig.ReadCpuUsage();
            //testResult("CPU使用信息" + cpu);
            //HDDInfo  hDDInfo= ServerConfig.ReadHddInfo();
            //ServerConfig.SyncSystemDatetime();
            //testObject(networkInfo);
            //testObject(hDDInfo);
            #endregion
            EPPlusExcel.TestExport();

            Console.ReadKey();
        }
        static bool IsLate(string onTime, out int minute)
        {
            DateTime curr = Convert.ToDateTime("2019-03-04 08:32:00");
            var time = Convert.ToDateTime(DateTime.Now.ToString("yyyy-MM-dd") + " " + onTime);
            if (curr <= time)
            {
                minute = 0;
                return false;
            }
            minute = (int)(DateTime.Now - time).TotalMinutes;
            return true;
        }

        static void getData()
        {
            testResult($"系统架构：{RuntimeInformation.OSArchitecture}\r\n");
            testResult($"系统名称：{RuntimeInformation.OSDescription}\r\n");
            testResult($"进程架构：{RuntimeInformation.ProcessArchitecture}\r\n");
            testResult($"是否64位操作系统：{Environment.Is64BitOperatingSystem}\r\n");
        }
        static void testObject<T>(T o)
        {
            List<String> list = new List<string>();
            Type type = typeof(T);
            PropertyInfo[] ps = type.GetProperties();
            foreach (PropertyInfo info in ps)
            {
                var name = info.GetCustomAttribute<DisplayNameAttribute>();
                list.Add((name == null ? info.Name : name.DisplayName) + ":" + (info.GetValue(o, null) == null ? string.Empty : info.GetValue(o, null).ToString()));
            }

            testResult(string.Join(",", list));
        }
        static void testResult(string context)
        {
            String basePath1 = AppContext.BaseDirectory;
            String basePath2 = Path.GetDirectoryName(typeof(Program).Assembly.Location);
            File.AppendAllText(basePath1 + "res.txt", "\r\n" + DateTime.Now.ToString("yyyy-MM-dd hh:MM:ss") + "\r\n" + context);
        }
    }

}
