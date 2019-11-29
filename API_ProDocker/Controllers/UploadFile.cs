using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Threading.Tasks;

namespace API_ProDocker.Controllers
{
    public class UploadFileController : ControllerBase
    {
        [HttpPost("UploadFiles")]
        public async Task<IActionResult> Post(List<IFormFile> files)
        {
            long size = files.Sum(f => f.Length);

            // full path to file in temp location
            var filePath = Path.GetTempFileName();

            foreach (var formFile in files)
            {
                if (formFile.Length > 0)
                {
                    using (var stream = new FileStream(filePath, FileMode.Create))
                    {
                        await formFile.CopyToAsync(stream);
                    }
                }
            }

            // process uploaded files
            // Don't rely on or trust the FileName property without validation.

            return Ok(new { count = files.Count, size, filePath });
        }


        ///// <summary>
        ///// 下载文件
        ///// </summary>
        ///// <param name="fileName"></param>
        ///// <returns></returns>
        //[HttpGet("api/download")]
        //public IActionResult GetFile(string fileName)
        //{
        //    fileName = "cn_windows_8_1_x64_dvd_2707237.iso";

        //    if (!_fileProvider.Exists(fileName))
        //    {
        //        return new StatusCodeResult(StatusCodes.Status404NotFound);
        //    }

        //    //获取下载文件长度
        //    var fileLength = _fileProvider.GetLength(fileName);

        //    //初始化下载文件信息
        //    var fileInfo = GetFileInfoFromRequest(_context.Request, fileLength);

        //    //获取剩余部分文件流
        //    var stream = new PartialContentFileStream(_fileProvider.Open(fileName),
        //                                         fileInfo.From, fileInfo.To);
        //    //设置响应 请求头
        //    SetResponseHeaders(_context.Response, fileInfo, fileLength, fileName);

        //    return new FileStreamResult(stream, new MediaTypeHeaderValue(MimeType));
        //}

    }
}
