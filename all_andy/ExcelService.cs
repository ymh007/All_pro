using NPOI.HSSF.UserModel;
using NPOI.SS.UserModel;
using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Reflection;

namespace all_andy
{
    public class  ExcelService
    {
        HSSFWorkbook workbook = null;
        ICellStyle styleHead = null;
        ICellStyle styleContent = null;

        /// <summary>
        /// 实例化
        /// </summary>
        public ExcelService()
        {
            workbook = new HSSFWorkbook();

            IFont font = workbook.CreateFont();
            font.Boldweight = (short)FontBoldWeight.Bold;

            styleHead = workbook.CreateCellStyle();
            styleHead.Alignment = HorizontalAlignment.Left;
            styleHead.VerticalAlignment = VerticalAlignment.Center;
            styleHead.WrapText = false;
            styleHead.SetFont(font);

            styleContent = workbook.CreateCellStyle();
            styleContent.Alignment = HorizontalAlignment.Left;
            styleContent.VerticalAlignment = VerticalAlignment.Center;
            styleContent.WrapText = false;
        }

        /// <summary>
        /// 获取文件流
        /// </summary>
        public MemoryStream GetFileStream()
        {
            MemoryStream file = new MemoryStream();
            workbook.Write(file);
            file.Seek(0, SeekOrigin.Begin);
            return file;
        }
        public void CreateSheet <T>(string sheetName, Dictionary<string, string> column, List<T> list)
        {
            ISheet sheet = workbook.CreateSheet(sheetName);

            sheet.DefaultRowHeight = 20 * 20;

            IRow row1 = sheet.CreateRow(0);

            IRow row4 = sheet.CreateRow(3);
            List<string> displayNameList = column.Keys.ToList();
            for (var i = 0; i < column.Keys.Count; i++)
            {
                ICell cell = row4.CreateCell(i);
                cell.SetCellValue(displayNameList[i].ToString());
                cell.CellStyle = styleHead;
            }

            List<string> columnNameList = column.Values.ToList();
            for (var i = 0; i < list.Count; i++)
            {
                IRow row = sheet.CreateRow(i + 4);
                for (var j = 0; j < columnNameList.Count; j++)
                {
                    ICell cell = row.CreateCell(j);
                    cell.SetCellValue(getPropertyValue(list[i], columnNameList[j]));
                    cell.CellStyle = styleContent;
                }
            }

            for (int i = 0; i < displayNameList.Count; i++)
            {
                sheet.AutoSizeColumn(i);
            }
        }

        /// <summary>
        /// 获取属性值
        /// </summary>
        string getPropertyValue<T>(T t, string propertyName)
        {
            PropertyInfo info = t.GetType().GetProperty(propertyName);
            //获取属性值转换暂设置如下字段，可根据实际情况添加
            if (info.PropertyType == typeof(DateTime))
            {
                return Convert.ToDateTime(info.GetValue(t)).ToString("yyyy-MM-dd HH:mm");
            }
            return info.GetValue(t) == null ? "" : info.GetValue(t).ToString();
        }
    }
}
