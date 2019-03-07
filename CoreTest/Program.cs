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
            Console.ReadKey();
        }
       static  bool IsLate(string onTime, out int minute)
        {
            DateTime curr = Convert.ToDateTime("2019-03-04 08:32:00");
            var time = Convert.ToDateTime(DateTime.Now.ToString("yyyy-MM-dd") + " " + onTime);// 上班时间
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
