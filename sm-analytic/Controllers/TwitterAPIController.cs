using System;
using Microsoft.AspNetCore.Mvc;
using Tweetinvi;
using Tweetinvi.Models;
using Microsoft.AspNetCore.Cors;
using Microsoft.Extensions.Caching.Memory;

namespace sm_analytic.Controllers
{

    /*
     * This controller takes care of the Twitter authentication process
     * For both our application and individual users
     */ 
    [ApiController]
    [EnableCors("AllowMyOrigin")]
    public class TwitterAPIController : ControllerBase
    {

        private IMemoryCache _cache;

        /*
         * Creates cache to store authentication data 
         * This makes it so that the same authentication data
         * can be stored and shared between requests
         */
        public TwitterAPIController(IMemoryCache memoryCache)
        {
            _cache = memoryCache;
        }

        /*
         * Function authenticates our application to user Twitter API
         * Also begins the user authentication process
         * and gets URL for login page that user needs to be redirected to
         * This URL gets returned to the front end
         */
        [Route("~/api/TwitterAuth")]
        [HttpGet]
        public string TwitterAuth()
        {

            AuthorizeOurApp(); 

            var appCreds = new ConsumerCredentials(
                Environment.GetEnvironmentVariable("CONSUMER_KEY"),
                Environment.GetEnvironmentVariable("CONSUMER_SECRET")
            );

            var redirectURL = Environment.GetEnvironmentVariable("redirectURL");
            IAuthenticationContext _authenticationContext = AuthFlow.InitAuthentication(appCreds, redirectURL);
            _cache.Set("_authContext", _authenticationContext);

            return _authenticationContext.AuthorizationURL;
           
        }

        /* After the user logins in/authorises our app through the 
         * redirected url, their credentials get passed to this function
         * This function authenticates the user
         * Returns user info after successful authentication
         * Returns an error otherwise
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
                // long userId = < YOUR_USER_ID >;
                // user.GetContributors
                var test = user.GetUserTimeline();
                return Ok(test);
            }
            catch (Exception ex)
            {
                Console.WriteLine($"Something went wrong: {ex}");
                return StatusCode(500, "Internal server error: " + ex.Message);
            }
            
        }

        [Route("~/api/GetSocialEngagementData")]
        [HttpPost]
        public ObjectResult GetSocialEngagementData([FromBody] Credentials credentials)
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

        /*
         * Function that authorizes our app to use Twitter API vs an individual user
         * Uses credentials stored in environment variables 
         */
        private void AuthorizeOurApp()
        {
            Auth.SetUserCredentials(
                Environment.GetEnvironmentVariable("CONSUMER_KEY"),
                Environment.GetEnvironmentVariable("CONSUMER_SECRET"),
                Environment.GetEnvironmentVariable("ACCESS_TOKEN"),
                Environment.GetEnvironmentVariable("ACCESS_TOKEN_SECRET")
            );
        }

        /*
         * Model for the user credentials passed into
         * ValidateTwitterAuth()
         */
        public class Credentials
        {
            public string authorization_id { get; set; }
            public string oauth_token { get; set; }
            public string oauth_verifier { get; set; }
        }
    }
}


