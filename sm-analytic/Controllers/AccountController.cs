using System;
using System.Collections.Generic;
using System.Linq;
using System.Security.Claims;
using System.Threading.Tasks;
using AutoMapper;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Options;
using Newtonsoft.Json;
using sm_analytic.Models;

namespace sm_analytic.Controllers
{
    [ApiController]
    //[Authorize(Policy = "")]
    public class AccountController : ControllerBase
    {
        private readonly DataDbContext                    _dataDbContext;
        private readonly Manager                          _manager;
        private readonly UserManager<IdentityCustomModel> _userManager;
        private readonly IJwtManager                      _jwtManager;
        private readonly JwtIssuerProps                   _jwtProps;

        public AccountController(UserManager<IdentityCustomModel> userManager, DataDbContext context, IJwtManager jwtManager, IOptions<JwtIssuerProps> jwtProps)
        {
            _userManager   = userManager;
            _dataDbContext = context;
            _manager       = new Manager(_dataDbContext);
            _jwtManager    = jwtManager;
            _jwtProps      = jwtProps.Value;
        }

        [Route("~/api/Account/Register")]
        [HttpPost, AllowAnonymous]
        public async Task<IActionResult> RegistryEndPoint([FromBody]AccountAdd newAccount)
        {
            if (!ModelState.IsValid)
            {
                return new BadRequestObjectResult(ModelState);
            }

            var newUserIdentity = _manager.IdentityGetMapped(newAccount);
            newUserIdentity.DOB = DateTime.Parse(newAccount.DOB);

            var result = await _userManager.CreateAsync(newUserIdentity, newAccount.Password);
            
            if (!result.Succeeded)
                return new BadRequestObjectResult("The User Cannot Be Registered");

            await _dataDbContext.Accounts.AddAsync(new Account { IdentityCustomModelId = newUserIdentity.Id,
                                                                 SearchBasicLimit      = 50,
                                                                 SearchBasicNum        = 0,
                                                                 SearchRegularLimit    = 250,
                                                                 SearchRegularNum      = 0,
                                                                 LastRequest           = DateTime.Now,
                                                                 });

            await _dataDbContext.SaveChangesAsync();

            return new OkObjectResult("Account Has Been Created");
        }


        [Route("~/api/Account/Login")]
        [HttpPost, AllowAnonymous]
        public async Task<IActionResult> LoginEndPoint([FromBody]AccountLogin account)
        {
            if (!ModelState.IsValid)
            {
                return new BadRequestObjectResult(ModelState);
            }

            var identity = await GetClaimsIdentity(account.Email, account.Password);
            
            if (identity == null)
            {
                return new BadRequestObjectResult("Login Failed. Invalid Username or Password.");
            }

            var jwt = await Manager.TokenGenerator.GenerateJwt(identity, _jwtManager, account.Email, _jwtProps);

            return new OkObjectResult(jwt);

        }

        private async Task<ClaimsIdentity> GetClaimsIdentity(string email /*aka userName*/, string password)
        {
            if (Manager.IsEmptyString(email) || Manager.IsEmptyString(password))
                return await Task.FromResult<ClaimsIdentity>(null);

            //Get the user, which is to be verified
            var userToVerify = await _userManager.FindByNameAsync(email);

            if (userToVerify == null)
                return await Task.FromResult<ClaimsIdentity>(null);

            //Check the credentials
            if (await _userManager.CheckPasswordAsync(userToVerify, password))
            {
                return await Task.FromResult(_jwtManager.GenerateClaimsIdentity(email, userToVerify.Id));
            }

            //Credentials are invalid, or account doesn't exist
            return await Task.FromResult<ClaimsIdentity>(null);
        }


    }
}
