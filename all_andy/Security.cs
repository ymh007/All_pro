using System.Net;
using System.Security.Cryptography.X509Certificates;
using System.Net.Security;
using System;

namespace all_andy
{
    public static class Security
    {
        public static void SetCertificatePolicy()
        {
            ServicePointManager.ServerCertificateValidationCallback
                       += RemoteCertificateValidate;
        }

        /// <summary>
        /// Remotes the certificate validate.
        /// </summary>
        private static bool RemoteCertificateValidate(
           object sender, X509Certificate cert,
            X509Chain chain, SslPolicyErrors error)
        {
            return false;
        }
    }
}
