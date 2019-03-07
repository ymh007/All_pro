using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace all_andy
{ 
    public interface IPeople
    {
        void DrinkWater();
    }
    public class VillPenple : IPeople
    {
        IWaterTool _pw;
        public VillPenple(IWaterTool pw)
        {
            _pw = pw;
        }

        public void DrinkWater()
        {
            Console.WriteLine("ssss");
        }
    }

    public class PressWater:IWaterTool
    {
        public string ReturnWater()
        {
            return "shui_jing";
        }
    }



    public interface IWaterTool
    {
        string ReturnWater();
    }

}
