using System;
using Microsoft.AspNetCore.Mvc;
using Tweetinvi;
using Tweetinvi.Models;
using Microsoft.AspNetCore.Cors;
using Microsoft.Extensions.Caching.Memory;

namespace sm_analytic.Controllers
{

    [ApiController]
    [EnableCors("AllowMyOrigin")]
    public class TwitterAPIController : ControllerBase
    {

        private IMemoryCache _cache;

        private string consumerKey;
        private string consumerSecret;
        private string accessToken;
        private string accessTokenSecret;

        public TwitterAPIController(IMemoryCache memoryCache)
        {
            _cache = memoryCache;
        }

        /*
         * Function authenticates our application to user Twitter API
         * Also begins the user authentication process
         * and gets URL for user to be redirected to
         */
        [Route("~/api/TwitterAuth")]
        [HttpGet]
        public string TwitterAuth()
        {

            authorizeApp(); 

            var appCreds = new ConsumerCredentials(
                consumerKey,
                consumerSecret
            );

            var redirectURL = "http://127.0.0.1:5000/dashboard";
            IAuthenticationContext _authenticationContext = AuthFlow.InitAuthentication(appCreds, redirectURL);
            _cache.Set("_authContext", _authenticationContext);

            return _authenticationContext.AuthorizationURL;
           
        }

        /*
         * Return user info 
         */
        [Route("~/api/ValidateTwitterAuth")]
        [HttpPost]
        public ObjectResult ValidateTwitterAuth([FromBody] Credentials credentials)
        {

            IAuthenticationContext _authenticationContext;
            _cache.TryGetValue("_authContext", out _authenticationContext);

            try
            {
                var userCreds = AuthFlow.CreateCredentialsFromVerifierCode(credentials.oauth_verifier, _authenticationContext);
                var user = Tweetinvi.User.GetAuthenticatedUser(userCreds);
                return Ok(user);
            }
            catch (Exception ex)
            {
                Console.WriteLine($"Something went wrong: {ex}");
                return StatusCode(500, "Internal server error: " + ex.Message);
            }
            
        }

        private void authorizeApp()
        {
            consumerKey = Environment.GetEnvironmentVariable("CONSUMER_KEY");
            consumerSecret = Environment.GetEnvironmentVariable("CONSUMER_SECRET");
            accessToken = Environment.GetEnvironmentVariable("ACCESS_TOKEN");
            accessTokenSecret = Environment.GetEnvironmentVariable("ACCESS_TOKEN_SECRET");

            Auth.SetUserCredentials(
                consumerKey,
                consumerSecret,
                accessToken,
                accessTokenSecret
            );
        }

        public class Credentials
        {
            public string authorization_id { get; set; }
            public string oauth_token { get; set; }
            public string oauth_verifier { get; set; }
        }
    }
}


