 
using System;
using System.Collections.Generic;
using System.Text;

namespace CoreTest
{
    public class MyAuth
    {
        //public static IEnumerable<ApiResource> GetResources()
        //{
        //    return new List<ApiResource> {
        //            new ApiResource {
        //                Name = "ImageResource",
        //                Scopes={ new Scope ("ImageResource")},//Scopes必须配置，否则获取token时返回 invalid_scope
        //            },
        //            new ApiResource { Name = "FileResourse" },
        //            new ApiResource { Name="Api",    Scopes={new Scope ("Api") } }
        //        };
        //}
        //public static IEnumerable<Client> GetClients()
        //{
        //    return new List<Client> {
        //            new Client {
        //                ClientId = "ClientId",
        //                AllowedGrantTypes =GrantTypes.ClientCredentials,//授权模式：客户端模式
        //                AllowedScopes={ "ImageResource","Api" }, //允许访问的资源 GetResources()中配置的
        //               ClientSecrets={ new Secret { Value= "ClientSecret".Sha256(), Expiration=DateTime.Now.AddMinutes(5)} }
        //            } };
        //}
    }
}
