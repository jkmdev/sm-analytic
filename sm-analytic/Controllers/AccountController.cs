using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using sm_analytic.Models;

namespace sm_analytic.Controllers
{
    //[ApiController]
    public class AccountController : ControllerBase
    {
        private readonly DataDbContext                    _dataDbContext;
        private readonly Manager                          _manager;
        private readonly UserManager<IdentityCustomModel> _userManager;

        public AccountController(UserManager<IdentityCustomModel> userManager, DataDbContext context)
        {
            _userManager   = userManager;
            _dataDbContext = context;
            _manager       = new Manager(_dataDbContext);
        }


        [Route("api/Account")]
        [HttpPost, AllowAnonymous]
        public async Task<IActionResult> Post([FromBody]AccountAdd newAccount)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            var newUserIdentity = _manager.identityGetMapped(newAccount);

            var result = await _userManager.CreateAsync(newUserIdentity, newAccount.Password);

            if (!result.Succeeded)
                return new BadRequestObjectResult("The User Cannot Be Registered");

            await _dataDbContext.Accounts.AddAsync(new Account { IdentityCustomModelId = newUserIdentity.Id,
                                                                 SearchBasicLimit      = 25,
                                                                 SearchBasicNum        = 0,
                                                                 SearchRegularLimit    = 125,
                                                                 SearchRegularNum      = 0,
                                                                 LastRequest           = new DateTime(),
                                                                 });

            await _dataDbContext.SaveChangesAsync();

            return new OkObjectResult("Account Has Been Created");
        }

    }
}
