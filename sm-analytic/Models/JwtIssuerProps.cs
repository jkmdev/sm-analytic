using Microsoft.IdentityModel.Tokens;
using System;
using System.Threading.Tasks;

namespace sm_analytic.Models
{
    /// <summary>
    /// Describes an instance of Java Web Token
    /// The details can be found here https://tools.ietf.org/html/rfc7519
    /// and here https://github.com/mmacneil/AngularASPNETCore2WebApiAuth/blob/master/src/Models/JwtIssuerOptions.cs
    /// </summary>
    public class JwtIssuerProps
    {
        /// <summary>
        /// "iss" - The claim identifies the principal that issued the JWT.
        /// </summary>
        public string Issuer { get; set; }

        /// <summary>
        /// "sub" - The claim identifies the principal that is the subject of the JWT.
        /// </summary>
        public string Subject { get; set; }

        /// <summary>
        /// "aud" - The claim identifies the recipients that the JWT is intended for.
        /// </summary>
        public string Audience { get; set; }

        /// <summary>
        /// "exp" - The claim identifies the expiration time.
        /// </summary>
        public DateTime Expiration => IssuedAt.Add(ValidFor);

        /// <summary>
        /// "nbf" - The claim identifies the time before which the JWT MUST NOT be accepted for processing.
        /// </summary>
        public DateTime NotBefore => DateTime.Now;

        /// <summary>
        /// "iat" - The claim identifies the time at which the JWT was issued.
        /// </summary>
        public DateTime IssuedAt => DateTime.Now;

        /// <summary>
        /// "jti" (JWT ID) Claim (default ID is a GUID)
        /// </summary>
        public Func<Task<string>> JtiGenerator => () => Task.FromResult(Guid.NewGuid().ToString());

        /// <summary>
        /// Set the timespan the token will be valid for (default is 120 min)
        /// </summary>
        public TimeSpan ValidFor { get; set; } = TimeSpan.FromMinutes(120);

        /// <summary>
        /// The signing key to use when generating tokens.
        /// </summary>
        public SigningCredentials SigningCredentials { get; set; }
    }
}
