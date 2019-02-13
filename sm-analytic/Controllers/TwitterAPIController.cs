using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Tweetinvi;
using System.Security.Claims;
using System.Net.Http;
using System.Diagnostics;
using Tweetinvi.Models;

namespace sm_analytic.Controllers
{

    //[Route("api/[controller]")]
    [ApiController]
    public class TwitterAPIController : ControllerBase
    {

        private IAuthenticationContext _authenticationContext;
        private string consumerKey;
        private string consumerSecret;
        private string accessToken;
        private string accessTokenSecret;

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
            _authenticationContext = AuthFlow.InitAuthentication(appCreds, redirectURL);

            return _authenticationContext.AuthorizationURL;
           
        }

        /*
         * Return user info 
         */
        [Route("~/api/ValidateTwitterAuth")]
        [HttpPost]
        public string ValidateTwitterAuth(Credentials credentials)
        {
            // Create the user credentials
            // var userCreds = AuthFlow.CreateCredentialsFromVerifierCode(credentials.oauth_verifier, _authenticationContext);

            // Do whatever you want with the user now!
            //ViewBag.User = Tweetinvi.User.GetAuthenticatedUser(userCreds);
            //return View();
            return "ayaya";
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
