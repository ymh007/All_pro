using System;
using System.Collections.Generic;
using System.Text;

namespace ExpressionClac
{
    public class TestMain
    {
        public object Test(string expression)
        {
            return ExpressionParser.Calculate(expression);
        }
    }
}
