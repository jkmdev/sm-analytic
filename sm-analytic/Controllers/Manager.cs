using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using System.Security.Cryptography;
using System.Text.RegularExpressions;
using AutoMapper;
using System.Web.Http.ModelBinding;
using Microsoft.AspNetCore.Identity;
using System.Security.Claims;
using sm_analytic.Controllers;
using Newtonsoft.Json;

namespace sm_analytic.Models
{
    public class Manager
    {
        private readonly DataDbContext _context;

        private readonly MapperConfiguration _config;
        private readonly IMapper _mapper;

        public Manager(DataDbContext context)
        {
            _context = context;

            _config = new MapperConfiguration(cfg =>
            {
                //Defining the maps here

                //cfg.CreateMap<Models.Account, Models.AccountBase>()
                //.ForMember(ab => ab.IsValid, map => map.MapFrom(a => a.IdentityCustomModel.EmailConfirmed))
                //.ForMember(ab => ab.Password, map => map.MapFrom(a => a.IdentityCustomModel.PasswordHash))
                //.ForMember(ab => ab.Email, map => map.MapFrom(a => a.IdentityCustomModel.UserName))
                //;

                cfg.CreateMap<Models.AccountAdd, Models.IdentityCustomModel>()
                .ForMember(icm => icm.UserName, map => map.MapFrom(aa => aa.Email))
                ;

            });

            _mapper = _config.CreateMapper();
        }

        public IdentityCustomModel IdentityGetMapped(AccountAdd newAccount)
        {
            return _mapper.Map<AccountAdd, IdentityCustomModel>(newAccount);
        }

        //********************  Static Helpers  ********************\\

        /// <summary>
        /// Hashes the passwordToHash with default SHA256 and returns hashed string
        /// </summary>
        /// <param name="passwordToHash">Unicode encoded String object</param>
        /// <returns>String</returns>
        public static String HashPasswordSHA256(String passwordToHash)
        {
            if (!(passwordToHash.Length > 1))
            {
                return new String("");
            }

            //Clear endlines
            if (passwordToHash.ToString().Contains('\0'))
                passwordToHash.ToString().Remove(passwordToHash.ToString().IndexOf('\0'));

            SHA256 sha   = SHA256.Create();
            byte[] bytes = sha.ComputeHash(System.Text.Encoding.UTF8.GetBytes(passwordToHash.ToString()));
            var    hash  = new System.Text.StringBuilder();

            foreach(byte oneByte in bytes)
            {
                hash.Append(String.Format("{0:X2}", oneByte));
            }

            return hash.ToString();
        }



        /// <summary>
        /// Validates string for not being empty
        /// </summary>
        /// <param name="str">Can be an empty string, the data is to be sanitized</param>
        /// <returns>True if the input is valid, False if input is invalid</returns>
        public static bool IsEmptyString(string str)
        {
            if (str == null ||
                str.ToString().Trim().Length == 0)
            {
                return true;
            }

            return false;
        }

        /// <summary>
        /// Sanitizes the input string (name) from all special characters
        /// </summary>
        /// <param name="name">First or last name, cannot be empty</param>
        /// <returns>Sanitized string</returns>
        public static string SanitizeName(string name)
        {
            const string unwanted = " !@#$%^&*()-_=+[]{};:\'|<>/?,.";

            var sanitizedString = new System.Text.StringBuilder(name.Length);

            foreach (char character in name.Where(i => !unwanted.Contains(i)))
            {
                sanitizedString.Append(character);
            }

            return sanitizedString.ToString();
        }


        /// <summary>
        /// Sanitizes the input string (password) from some special characters
        /// </summary>
        /// <param name="password">Password, cannot be empty</param>
        /// <returns>Sanitized string</returns>
        public static string SanitizePassword(string password)
        {
            //Allowed: @!_
            const string unwanted = " #$%^&*-=+[]{}();:\'|<>/?,.";

            var sanitizedString = new System.Text.StringBuilder(password.Length);

            foreach (char character in password.Where(i => !unwanted.Contains(i)))
            {
                sanitizedString.Append(character);
            }
            
            return sanitizedString.ToString();
        }

        /// <summary>
        /// Validates if email follows Regex rules
        /// source: https://docs.microsoft.com/en-us/dotnet/standard/base-types/how-to-verify-that-strings-are-in-valid-email-format
        /// </summary>
        /// <param name="email">Email string to be validated</param>
        /// <returns>True if the input is valid, False if input is invalid</returns>
        public static bool EmailValidation(string email)
        {
            return Regex.IsMatch(email,
                @"^(?("")("".+?(?<!\\)""@)|(([0-9a-z]((\.(?!\.))|[-!#\$%&'\*\+/=\?\^`\{\}\|~\w])*)(?<=[0-9a-z])@))" +
                @"(?(\[)(\[(\d{1,3}\.){3}\d{1,3}\])|(([0-9a-z][-0-9a-z]*[0-9a-z]*\.)+[a-z0-9][\-a-z0-9]{0,22}[a-z0-9]))$",
                RegexOptions.IgnoreCase, TimeSpan.FromMilliseconds(250));
        }

        /// <summary>
        /// Helper class for adding an error(s) to model state.
        /// </summary>
        public static class Errors
        {
            public static ModelStateDictionary AddErrorsToModelState(IdentityResult identityResult, ModelStateDictionary modelState)
            {
                foreach (var e in identityResult.Errors)
                {
                    modelState.AddModelError(e.Code, e.Description);
                }

                return modelState;
            }

            public static ModelStateDictionary AddErrorToModelState(string code, string description, ModelStateDictionary modelState)
            {
                modelState.AddModelError(code, description);
                return modelState;
            }
        }

        /// <summary>
        /// Claim types
        /// </summary>
        public static class JwtClaimHelper
        {
            public static string ClaimIdentifierRole  = "SMA_ClaimIdentifierRole",
                                 ClaimIdentifierId    = "SMA_ClaimIdentifierId",
                                 ClaimValue           = "SMA_ClaimValue";
        }

        /// <summary>
        /// JWT token generator
        /// </summary>
        public static class TokenGenerator
        {
            public static async Task<string> GenerateJwt(ClaimsIdentity identity, IJwtManager jwtManager, string email /*aka userName in IdentityCustomModel*/, JwtIssuerProps jwtProps)
            {
                var jwt = new
                {
                    id         = identity.Claims.Single(i => i.Type == JwtClaimHelper.ClaimIdentifierId).Value,
                    auth_token = await jwtManager.GenerateEncodedToken(email, identity),
                    expires_in = (int)jwtProps.ValidFor.TotalSeconds
                };

                return JsonConvert.SerializeObject(jwt, new JsonSerializerSettings { Formatting = Formatting.Indented});
            }
        }




    }
}
