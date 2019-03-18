using System;
using System.Collections.Generic;
using System.Linq;
using System.Security.Claims;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using sm_analytic.Models;

namespace sm_analytic.Controllers
{
    [ApiController]
    public class DashboardController : ControllerBase
    {
        private readonly DataDbContext _dataDbContext;
        private readonly ClaimsPrincipal _userCaller;

        public DashboardController(DataDbContext dataDbContext, IHttpContextAccessor httpContextAccessor, UserManager<IdentityCustomModel> userManager)
        {
            _userCaller    = httpContextAccessor.HttpContext.User;
            _dataDbContext = dataDbContext;
        }

        /// <summary>
        /// Getting details of already logged in user
        /// </summary>
        /// <returns>First and last names, email, date of birth</returns>
        [Route("~/api/Dashboard/GetUserDetails")]
        //[Authorize(Policy = "SMAnalytic")]
        [HttpGet]
        public async Task<IActionResult> GetCallerDetails()
        {

            Console.WriteLine("!!!____ IN GET DETAILS");
            Console.WriteLine("!!!____ _userCaller: isSET:" + "authenticated=" + _userCaller.Identity.IsAuthenticated + "  " + _userCaller.Identity.Name + "  Claim count=" + _userCaller.Claims.Count());
            _userCaller.Claims.ToList().ForEach(i => Console.WriteLine("!!!____ _userCaller.Claims: "+ i.Type + "  " + i.Value));

            var userId = _userCaller.Claims.Single(i => i.Type == Manager.JwtClaimHelper.ClaimIdentifierId).Value;
            Console.WriteLine("!!!____ GOT USERID: " + userId);

            var user = await _dataDbContext.Accounts.Include(i => i.IdentityCustomModel).SingleAsync(i => i.IdentityCustomModelId == userId);
            Console.WriteLine("!!!____ MATCHED USER: " + user.IdentityCustomModel.Email);

            // Structure as in "dashboard.service.ts"
            return new OkObjectResult(new
            {
                user.IdentityCustomModel.FirstName,
                user.IdentityCustomModel.LastName,
                user.IdentityCustomModel.Email,
                user.IdentityCustomModel.DOB
            });

        }
    }
}
