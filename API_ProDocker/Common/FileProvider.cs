using Microsoft.Extensions.FileProviders;
using Microsoft.Extensions.Primitives;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace API_ProDocker.Common
{
    public class FileProvider :IFileProvider
    {

        public IFileInfo Info { get; set; }

        public IDirectoryContents GetDirectoryContents(string subpath)
        {
            throw new NotImplementedException();
        }

        public IFileInfo GetFileInfo(string subpath)
        {
            this.Info= GetFileInfo(subpath);
            return this.Info;
        }

        public IChangeToken Watch(string filter)
        {
            throw new NotImplementedException();
        }

        public bool Exists()
        {
           return  this.Info.Exists;
        }


    }
    //public interface IFileProvider
    //{
    //    IFileInfo GetFileInfo(string subpath);
    //    IDirectoryContents GetDirectoryContents(string subpath);
    //    IChangeToken Watch(string filter);
    //}
}
