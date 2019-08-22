using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Newtonsoft.Json;
namespace all_andy
{


    public static class DataProcess
    {
        public static List<EmployeeListViewModel> FindData()
        {
            string filePath = @"D:\contacts.txt";
            string filePathSeagull = @"D:\seagull2Data.txt";
            List<ContactsModel> findAll = new List<ContactsModel>();
            List<ContactsModel> segull = new List<ContactsModel>();
            string jsonData = System.IO.File.ReadAllText(filePath);
            string jsonSegull= System.IO.File.ReadAllText(filePathSeagull);
            JsonMode strToData = JsonConvert.DeserializeObject<JsonMode>(jsonData);
            JsonMode strToseagull = JsonConvert.DeserializeObject<JsonMode>(jsonSegull);
            findAll = strToData.dt.FindAll(w => w.FullPath.StartsWith(strToData.queryStr)).ToList();
            var listJoin = findAll.Join(
                        strToseagull.dt,
                        outer => outer.ObjectID,
                        inner => inner.userId,
                        (i, o) => new EmployeeListViewModel()
                        {
                            Code = i.ObjectID,
                            CnName = i.DisplayName,
                            EnName = i.Logon_Name,
                            Email = i.Mail,
                            FullPath = i.FullPath,
                            IsValid = o.isValid,
                           // InviteCount = o.,
                            Phone = i.MP,
                            AppVersion = o.appVersion
                        });


            return listJoin.ToList();
        }
    }

    public class EmployeeListViewModel
    {
        /// <summary>
        /// 人员编码
        /// </summary>
        public string Code { set; get; }
        /// <summary>
        /// 域帐号
        /// </summary>
        public string CnName { set; get; }
        /// <summary>
        /// 人员名称
        /// </summary>
        public string EnName { set; get; }
        /// <summary>
        /// 电子邮箱
        /// </summary>
        public string Email { set; get; }
        /// <summary>
        /// 组织机构路径
        /// </summary>
        public string FullPath { set; get; }
        /// <summary>
        /// 邀请次数
        /// </summary>
        public int InviteCount { set; get; }
        /// <summary>
        /// 是否激活
        /// </summary>
        public bool IsValid { set; get; }

        /// <summary>
        /// 电话
        /// </summary>
        public string Phone { set; get; }

        /// <summary>
        /// 版本
        /// </summary>
        public string AppVersion { set; get; }
    }


    public class JsonMode
    {
        public string queryStr { get; set; }

        public List<ContactsModel> dt { get; set; }
    }

    /// <summary>
    /// 通讯录 Model
    /// </summary>
    public class ContactsModel
    {
        /// <summary>
        /// 主键编码
        /// </summary>
        public string Code { set; get; }

        /// <summary>
        /// 人员Code
        /// </summary>
        public string ObjectID { get; set; }

        /// <summary>
        /// 所属组织机构
        /// </summary>
        public string ParentID { get; set; }

        /// <summary>
        /// 登录名
        /// </summary>
        public string Logon_Name { get; set; }

        /// <summary>
        /// 名称
        /// </summary>
        public string DisplayName { get; set; }

        /// <summary>
        /// 组织机构路径
        /// </summary>
        public string FullPath { get; set; }

        /// <summary>
        /// 邮箱
        /// </summary>
        public string Mail { get; set; }

        /// <summary>
        /// 住宅电话
        /// </summary>
        public string WP { get; set; }

        /// <summary>
        /// 电话
        /// </summary>
        public string MP { get; set; }

        /// <summary>
        /// 全局排序
        /// </summary>
        public string GlobalSort { get; set; }

        /// <summary>
        /// 内部排序
        /// </summary>
        public int InnerSort { set; get; }

        /// <summary>
        /// 类型（Organizations、Users）
        /// </summary>
        public string SchemaType { set; get; }

        /// <summary>
        /// 职位名称
        /// </summary>
        public string EmploymentName { set; get; }

        /// <summary>
        /// 职能类别
        /// </summary>
        public string StationCategory { set; get; }

        /// <summary>
        /// 职能类别全路径
        /// </summary>
        public string FullPathStationCategory { set; get; }

        /// <summary>
        /// 是否为主职
        /// </summary>
        public int IsDefault { get; set; }


        public string userId { get; set; }
        public string appVersion { get; set; }
        public bool isValid { get; set; }


    }
}
