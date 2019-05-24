using System;
namespace CoreTest
{
    class Program
    {
        static void Main(string[] args)
        {
            ////TestMain tm = new TestMain();
            ////Console.WriteLine(tm.Test("5>2&&(3==3||3>4)"));
            //int a = 234;
            //char [] carray = a.ToString().ToCharArray();
            //for (int i = 0; i < carray.Length; i++)
            //{
            //    Console.WriteLine(carray[i]);
            //} 
            DateTime start = DateTime.Parse("2019-04-03 15:00:00");
            DateTime end = DateTime.Parse("2019-04-02 14:59:01");
            TimeSpan ts = start.Subtract(end);
            int a =(int)ts.TotalMinutes;
            Console.WriteLine("时间间隔分钟数："+a);
            Console.Write(ts);

            Console.ReadKey();
        }
       static  bool IsLate(string onTime, out int minute)
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
    }
}
