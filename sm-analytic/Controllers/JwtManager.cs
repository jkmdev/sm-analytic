using Microsoft.Extensions.Options;
using sm_analytic.Models;
using System;
using System.Collections.Generic;
using System.IdentityModel.Tokens.Jwt;
using System.Linq;
using System.Security.Claims;
using System.Security.Principal;
using System.Threading.Tasks;

namespace sm_analytic.Controllers
{
    /// <summary>
    /// Exists solely in order of having JwtManager as a Singleton
    /// </summary>
    public interface IJwtManager
    {
        Task<string> GenerateEncodedToken(string userName, ClaimsIdentity identity);

        ClaimsIdentity GenerateClaimsIdentity(string userName, string id);
    }

    public class Jwt
    {
        public string id;
        public string auth_token;
        public int    expires_in;
    }

    /// <summary>
    /// Manages tokens distribution
    /// </summary>
    public class JwtManager : IJwtManager
    {
        private readonly JwtIssuerProps _jwtProps;

        public JwtManager(IOptions<JwtIssuerProps> jwtProps)
        {
            _jwtProps = jwtProps.Value;
            ThrowIfInvalidProps(_jwtProps);
        }

        public async Task<string> GenerateEncodedToken(string userName, ClaimsIdentity identity)
        {
            var claims = new[]
            {
                 new Claim(JwtRegisteredClaimNames.Sub, userName),
                 new Claim(JwtRegisteredClaimNames.Jti, await _jwtProps.JtiGenerator()),
                 new Claim(JwtRegisteredClaimNames.Iat, ToUnixEpochDate(_jwtProps.IssuedAt).ToString(), ClaimValueTypes.Integer64),
                 identity.FindFirst(Manager.JwtClaimHelper.ClaimIdentifierRole),
                 identity.FindFirst(Manager.JwtClaimHelper.ClaimIdentifierId)
             };

            // Create the JWT security token and encode it.
            var jwt = new JwtSecurityToken(
                issuer: _jwtProps.Issuer,
                audience: _jwtProps.Audience,
                claims: claims,
                notBefore: _jwtProps.NotBefore,
                expires: _jwtProps.Expiration,
                signingCredentials: _jwtProps.SigningCredentials);

            var encodedJwt = new JwtSecurityTokenHandler().WriteToken(jwt);

            return encodedJwt;
        }

        public ClaimsIdentity GenerateClaimsIdentity(string userName, string id)
        {
            
            var claimIdentity = new ClaimsIdentity(new GenericIdentity(userName, "Token"),   new[]
                                                                                {
                                                                                    new Claim(Manager.JwtClaimHelper.ClaimIdentifierId, id),
                                                                                    new Claim(Manager.JwtClaimHelper.ClaimIdentifierRole, Manager.JwtClaimHelper.ClaimValue)
                                                                                });

            Console.WriteLine("______!!!!_____ GenerateClaimsIdentity | ClaimsIdentity: auth?=" + claimIdentity.IsAuthenticated + " name="+claimIdentity.Name);

            return claimIdentity;
        }

        /// <returns>
        /// Date converted to seconds since Unix epoch (Jan 1, 1970, midnight UTC).
        /// </returns>
        private static long ToUnixEpochDate(DateTime date)
          => (long)Math.Round((date.ToUniversalTime() -
                               new DateTimeOffset(1970, 1, 1, 0, 0, 0, TimeSpan.Zero))
                              .TotalSeconds);

        private static void ThrowIfInvalidProps(JwtIssuerProps options)
        {
            if (options == null) throw new ArgumentNullException(nameof(options));

            if (options.ValidFor <= TimeSpan.Zero)
            {
                throw new ArgumentException("Must be a non-zero TimeSpan.", nameof(JwtIssuerProps.ValidFor));
            }

            if (options.SigningCredentials == null)
            {
                throw new ArgumentNullException(nameof(JwtIssuerProps.SigningCredentials));
            }

            if (options.JtiGenerator == null)
            {
                throw new ArgumentNullException(nameof(JwtIssuerProps.JtiGenerator));
            }
        }
    }

}

