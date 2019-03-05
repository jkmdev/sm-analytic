using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using AutoMapper;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Identity; //
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Options;
using sm_analytic.Models;

namespace sm_analytic.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    //[Authorize(Policy = "")]
    public class AccountController : ControllerBase
    {
        private readonly DataDbContext                    _dataDbContext;
        private readonly Manager                          _manager;
        private readonly UserManager<IdentityCustomModel> _userManager;
        private readonly JwtManager                       _jwtManager;
        private readonly JwtIssuerProps                   _jwtProps;

        public AccountController(UserManager<IdentityCustomModel> userManager, DataDbContext context, JwtManager jwtManager, IOptions<JwtIssuerProps> jwtProps)
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
                return BadRequest(ModelState);
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

    }
}
