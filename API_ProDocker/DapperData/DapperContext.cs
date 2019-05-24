using API_ProDocker.Models;
using Dapper;
using Microsoft.Extensions.Configuration;
using System;
using System.Collections.Generic;
using System.Data;
using System.Data.SqlClient;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using static API_ProDocker.Startup;

namespace API_ProDocker.DapperData
{

    #region  zuofei

    public class DapperContext
    {
        public static string connectionString = null;
        public DapperContext(string _strconnection)
        {
            connectionString = _strconnection;
        }

        //连接字符串
        //static string connectionString = configuration.GetConnectionString("DefaultConnection");
        public static SqlConnection Connection()
        {
            var mssql = new SqlConnection(connectionString);
            mssql.Open();
            return mssql;

        }
        /// <summary>
        /// 根据用户姓氏查询用户集合
        /// </summary>
        /// <param name="lastName">姓氏</param>
        /// <returns></returns>
        public List<Student> FindListByLastName(string lastName)
        {
            using (IDbConnection db = Connection())
            {
                string sql = $"SELECT * FROM Student WHERE LastName like @lastName";
                IEnumerable<Student> list = db.Query<Student>(sql, new { lastName = "%"+lastName+"%" });
                return list.ToList();
            }
        }
    }

    #endregion


    public interface IEntity<TPrimaryKey>
    {
        TPrimaryKey Id { get; set; }
    }
    public class BaseModel : IEntity<Guid>
    {
        public Guid Id { get; set; }
    }

    public class DataBaseConfig
    {
        #region SqlServer链接配置

        private static string DefaultSqlConnectionString = @"Data Source=localhost;Initial Catalog=Dinner;User ID=sa;Password=123456;";
        private static string DefaultRedisString = "localhost, abortConnect=false";
        //private static ConnectionMultiplexer redis;

        public static IDbConnection GetSqlConnection(string sqlConnectionString = null)
        {
            if (string.IsNullOrWhiteSpace(sqlConnectionString))
            {
                sqlConnectionString = DefaultSqlConnectionString;
            }
            IDbConnection conn = new SqlConnection(sqlConnectionString);
            conn.Open();
            return conn;
        }

        #endregion

        #region Redis链接配置

        //private static ConnectionMultiplexer GetRedis(string redisString = null)
        //{
        //    if (string.IsNullOrWhiteSpace(redisString))
        //    {
        //        redisString = DefaultRedisString;
        //    }
        //    if (redis == null || redis.IsConnected)
        //    {
        //        redis = ConnectionMultiplexer.Connect(redisString);
        //    }
        //    return redis;
        //}

        #endregion
    }


    public interface IRepositoryBase<T>
    {
        Task Insert(T entity, string insertSql);

        Task Update(T entity, string updateSql);

        Task Delete(Guid Id, string deleteSql);

        Task<List<T>> Select(string selectSql);

        Task<T> Detail(Guid Id, string detailSql);

        /// <summary>
        /// 无参存储过程
        /// </summary>
        /// <param name="SPName"></param>
        /// <param name="args"></param>
        /// <returns></returns>
        Task<List<T>> ExecQuerySP(string SPName);
    }


    public class RepositoryBase<T> : IRepositoryBase<T> 
    {
        public async Task Delete(Guid Id, string deleteSql)
        {
            using (IDbConnection conn = DataBaseConfig.GetSqlConnection())
            {
                await conn.ExecuteAsync(deleteSql, new { Id = Id });
            }
        }

        public async Task<T> Detail(Guid Id, string detailSql)
        {
            using (IDbConnection conn = DataBaseConfig.GetSqlConnection())
            {
                //string querySql = @"SELECT Id, UserName, Password, Gender, Birthday, CreateDate, IsDelete FROM dbo.Users WHERE Id=@Id";
                return await conn.QueryFirstOrDefaultAsync<T>(detailSql, new { Id = Id });
            }
        }

        /// <summary>
        /// 无参存储过程
        /// </summary>
        /// <param name="SPName"></param>
        /// <returns></returns>
        public async Task<List<T>> ExecQuerySP(string SPName)
        {
            using (IDbConnection conn = DataBaseConfig.GetSqlConnection())
            {
                return await Task.Run(() => conn.Query<T>(SPName, null, null, true, null, CommandType.StoredProcedure).ToList());
            }
        }

        public async Task Insert(T entity, string insertSql)
        {
            using (IDbConnection conn = DataBaseConfig.GetSqlConnection())
            {
                await conn.ExecuteAsync(insertSql, entity);
            }
        }

        public async Task<List<T>> Select(string selectSql)
        {
            using (IDbConnection conn = DataBaseConfig.GetSqlConnection())
            {
                //string selectSql = @"SELECT Id, UserName, Password, Gender, Birthday, CreateDate, IsDelete FROM dbo.Users";
                return await Task.Run(() => conn.Query<T>(selectSql).ToList());
            }
        }

        public async Task Update(T entity, string updateSql)
        {
            using (IDbConnection conn = DataBaseConfig.GetSqlConnection())
            {
                await conn.ExecuteAsync(updateSql, entity);
            }
        }
    }



}
