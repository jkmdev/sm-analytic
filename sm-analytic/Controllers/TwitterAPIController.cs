using System;
using Microsoft.AspNetCore.Mvc;
using Tweetinvi;
using Tweetinvi.Models;
using Microsoft.AspNetCore.Cors;
using Microsoft.Extensions.Caching.Memory;
using Tweetinvi.Models.DTO;
using System.Net.Http;
using Newtonsoft.Json;
using System.Text;
using System.Net.Http.Headers;
using System.Threading.Tasks;

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
        private readonly IHttpClientFactory _clientFactory;

        /*
         * Creates cache to store authentication data 
         * This makes it so that the same authentication data
         * can be stored and shared between requests
         */
        public TwitterAPIController(IMemoryCache memoryCache, IHttpClientFactory clientFactory)
        {
            _cache = memoryCache;
            _clientFactory = clientFactory;
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
        public async Task<HttpContent> ValidateTwitterAuthAsync([FromBody] Credentials credentials)
        {


            IAuthenticationContext _authenticationContext;
            _cache.TryGetValue("_authContext", out _authenticationContext);


                var userCreds = AuthFlow.CreateCredentialsFromVerifierCode(credentials.oauth_verifier, _authenticationContext);
                var user = Tweetinvi.User.GetAuthenticatedUser(userCreds);
                // long userId = < YOUR_USER_ID >;
                // user.GetContributors
                var test = user.GetUserTimeline();

                var creds = Auth.SetApplicationOnlyCredentials(
                    Environment.GetEnvironmentVariable("CONSUMER_KEY"),
                    Environment.GetEnvironmentVariable("CONSUMER_SECRET"),
                    true
                );

                var bearerToken = creds.ApplicationOnlyBearerToken;

                // You can sort of do this “manually” -Using the Search API, 
                // look for any tweet that’s with to:DanielCHood as a query for example, 
                // having your own tweet ids, count the replies to them 
                // using in_reply_to_status_id fields of the search results. Or rely 
                // on your User Stream https://dev.twitter.com/streaming/userstreams#replies 

                // 1. Us premium api to search tweets, return those instead

                // return Ok(test); // returns all relevant data at this stage

                // return Ok(TwitterAccessor.ExecuteGETQuery<IUserDTO>("https://api.twitter.com/1.1/users/show.json?screen_name=tweetinviapi"));

                // JsonObject jsonObj = new JsonObject();
                // jsonObj["content_one"] = JsonValue.CreateNumberValue(600);
                // jsonObj["content_two"] = JsonValue.CreateStringValue("my content value");

                // Create the IHttpContent
                // IHttpContent jsonContent = new HttpJsonContent(jsonObj);

                // var request = new HttpRequestMessage(System.Net.Http.HttpMethod.Post,
                //    "https://api.twitter.com/1.1/tweets/search/30day/sandboxSearchMonthly.json");

                // request.Headers.Add("authorization", "Bearer " + bearerToken);
                // request.Headers.Add("content-type", "application/json");
                // request.Content = new StringContent("{\"query\":\"from:TwitterDev lang:en\"}", Encoding.UTF8, "application/json");


                // "query":"from:TwitterDev lang:en"

                var client = _clientFactory.CreateClient();
                client.DefaultRequestHeaders.Authorization = new AuthenticationHeaderValue("Bearer", bearerToken);

                var uri = "https://api.twitter.com/1.1/tweets/search/30day/sandboxSearchMonthly.json";
                var query = "{\"query\":\"from:TwitterDev lang:en\"}";

                var response = await client.PostAsync(uri, new StringContent(query, Encoding.UTF8, "application/json"));

                return response.Content;
                // return Ok(response);

            
            
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


