using OfficeOpenXml;
using OfficeOpenXml.Style;
using System;
using System.Collections.Generic;
using System.Data;
using System.Drawing;
using System.IO;
using System.Text;

namespace CoreTest
{
    public class EPPlusExcel
    {



        public static void TestExport()
        {
            DataTable dt = new DataTable("TestData");
            dt.Columns.Add(new DataColumn("ID", typeof(int)));
            dt.Columns.Add(new DataColumn("Name", typeof(string)));
            dt.Columns.Add(new DataColumn("Address", typeof(string)));
            dt.Columns.Add(new DataColumn("Age", typeof(int)));
            dt.Columns.Add(new DataColumn("Phone", typeof(string)));
            dt.Columns.Add(new DataColumn("Mark", typeof(string)));
            for (int i = 1; i < 2001; i++)
            {
                Random rd = new Random();
                DataRow row = dt.NewRow();
                row[0] = i;
                row[1] ="帕苏儿.青铜止血.吕归尘" +rd.Next();
                row[2] = "科技二路西安软件园72号"+rd.Next();
                row[3] = (i*i)%2;
                row[4] = "187263463"+i;
                row[5] = "这是备注信息"+rd.Next();
            }
            ExportByEPPlus(dt, DateTime.Now.ToString("yyyyMMdd")+".xlsx");

        }



        /// <summary>
        /// 使用EPPlus导出Excel(xlsx)
        /// </summary>
        /// <param name="sourceTable">数据源</param>
        /// <param name="strFileName">xlsx文件名(不含后缀名)</param>
        public static void ExportByEPPlus(DataTable sourceTable, string strFileName)
        {
            using (ExcelPackage pck = new ExcelPackage())
            {
                //Create the worksheet
                string sheetName = string.IsNullOrEmpty(sourceTable.TableName) ? "Sheet1" : sourceTable.TableName;
                ExcelWorksheet ws = pck.Workbook.Worksheets.Add(sheetName);

                //Load the datatable into the sheet, starting from cell A1. Print the column names on row 1
                ws.Cells["A1"].LoadFromDataTable(sourceTable, true);

                //Format the row
                ExcelBorderStyle borderStyle = ExcelBorderStyle.Thin;
                Color borderColor = Color.FromArgb(155, 155, 155);

                using (ExcelRange rng = ws.Cells[1, 1, sourceTable.Rows.Count + 1, sourceTable.Columns.Count])
                {
                    rng.Style.Font.Name = "宋体";
                    rng.Style.Font.Size = 10;
                    rng.Style.Fill.PatternType = ExcelFillStyle.Solid;                      //Set Pattern for the background to Solid
                    rng.Style.Fill.BackgroundColor.SetColor(Color.FromArgb(255, 255, 255));

                    rng.Style.Border.Top.Style = borderStyle;
                    rng.Style.Border.Top.Color.SetColor(borderColor);

                    rng.Style.Border.Bottom.Style = borderStyle;
                    rng.Style.Border.Bottom.Color.SetColor(borderColor);

                    rng.Style.Border.Right.Style = borderStyle;
                    rng.Style.Border.Right.Color.SetColor(borderColor);
                }

                //Format the header row
                using (ExcelRange rng = ws.Cells[1, 1, 1, sourceTable.Columns.Count])
                {
                    rng.Style.Font.Bold = true;
                    rng.Style.HorizontalAlignment = ExcelHorizontalAlignment.Center;
                    rng.Style.Fill.BackgroundColor.SetColor(Color.FromArgb(234, 241, 246));  //Set color to dark blue
                    rng.Style.Font.Color.SetColor(Color.FromArgb(51, 51, 51));
                }
                string filePath = AppContext.BaseDirectory + "/excel/";
                if (!Directory.Exists(filePath))// 判断文件夹是否存在 
                {
                    Directory.CreateDirectory(filePath);//不存在则创建文件夹 
                }
                FileInfo fileInfo = new FileInfo(Path.Combine(filePath, strFileName));
                pck.SaveAs(fileInfo);

                ////Write it back to the client
                //HttpContext.Current.Response.ContentType = "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet";
                //HttpContext.Current.Response.AddHeader("content-disposition", string.Format("attachment;  filename={0}.xlsx", HttpUtility.UrlEncode(strFileName, Encoding.UTF8)));
                //HttpContext.Current.Response.ContentEncoding = Encoding.UTF8;

                //HttpContext.Current.Response.BinaryWrite(pck.GetAsByteArray());
                //HttpContext.Current.Response.End();
            }
        }


    }
}
