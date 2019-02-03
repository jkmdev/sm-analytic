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

            var redirectURL = "https://127.0.0.1:5001/dashboard";
            _authenticationContext = AuthFlow.InitAuthentication(appCreds, redirectURL);

            return _authenticationContext.AuthorizationURL;
           
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
    }
}
