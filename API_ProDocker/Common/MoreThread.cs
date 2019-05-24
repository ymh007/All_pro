using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace API_ProDocker.Common
{
    public class MoreThread
    {

    }

    interface IReadFromShared
    {
        string GetValue();
    }

    interface IWriteToShared
    {
        void SetValue(string value);
    }

    class MySharedClass : IReadFromShared, IWriteToShared
    {
        string _foo;

        public string GetValue()
        {
            return _foo;
        }

        public void SetValue(string value)
        {
            _foo = value;
        }
    }

    
}
