﻿using System;
using System.Collections.Generic;
using System.Linq;
using System.Net.Mail;
using System.Security.Claims;
using System.Threading.Tasks;
using FluentEmail.Core;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Cors;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using sm_analytic.Models;

namespace sm_analytic.Controllers
{
    [ApiController]
    [EnableCors("AllowMyOrigin")]
    public class DashboardController : ControllerBase
    {
        private readonly DataDbContext _dataDbContext;
        private readonly ClaimsPrincipal _userCaller;
        private readonly UserManager<IdentityCustomModel> _userManager;

        public DashboardController(DataDbContext dataDbContext, IHttpContextAccessor httpContextAccessor, UserManager<IdentityCustomModel> userManager)
        {
            _userCaller    = httpContextAccessor.HttpContext.User;
            _dataDbContext = dataDbContext;
            _userManager   = userManager;
        }

        /// <summary>
        /// Getting details of already logged in user
        /// </summary>
        /// <returns>First and last names, email, date of birth</returns>
        [Route("~/api/Dashboard/GetUserDetails")]
        [Authorize(Policy = "SMAnalytic")]
        [HttpGet]
        public async Task<IActionResult> GetCallerDetails()
        {

            Console.WriteLine("!!!____ _userCaller: isSET:" + "authenticated=" + _userCaller.Identity.IsAuthenticated + "  " + _userCaller.Identity.Name + "  Claim count=" + _userCaller.Claims.Count());
            _userCaller.Claims.ToList().ForEach(i => Console.WriteLine("!!!____ _userCaller.Claims: "+ i.Type + "  " + i.Value));

            var userId = _userCaller.Claims.Single(i => i.Type == Manager.JwtClaimHelper.ClaimIdentifierId).Value;

            var user = await _dataDbContext.Accounts.Include(i => i.IdentityCustomModel).SingleAsync(i => i.IdentityCustomModelId == userId);

            var toReturn = new AccountBaseInfo
            {
                FirstName = user.IdentityCustomModel.FirstName,
                LastName  = user.IdentityCustomModel.LastName,
                Email     = user.IdentityCustomModel.Email,
                DOB       = user.IdentityCustomModel.DOB
            };

            return new OkObjectResult(toReturn);

        }

        /// <summary>
        /// Sends email to SMAnalytic's email box
        /// </summary>
        /// <param name="EmailMessage">Email body message and its destination</param>
        /// <returns>Success message if sent</returns>
        [Route("~/api/Dashboard/SendEmail")]
        //[Authorize(Policy = "SMAnalytic")]
        [HttpPost]
        public async Task<IActionResult> SendEmail([FromServices]IFluentEmail email, [FromBody]EmailMessage emailMessage)
        {
            var result = await email
                               .To(emailMessage.Destination)
                               .Subject("HELP ME")
                               .Body(emailMessage.Message)
                               .SendAsync();

            //SmtpClient myclient = new SmtpClient
            //{
            //    UseDefaultCredentials = true,
            //    Credentials = new System.Net.NetworkCredential("username", "user password"),
            //    DeliveryMethod = SmtpDeliveryMethod.Network
            //};

            if (result.Successful)
                return new OkObjectResult(new {result = "The email has been sent"});
            else
                return new BadRequestObjectResult(new { result = "Couldn't sent the email" });
        }
    }
}
