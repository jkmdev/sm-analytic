using System;
using System.Collections.Generic;
using System.ComponentModel;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Web;

namespace sm_analytic.Models
{
    public class AccountAdd
    {
        [DisplayName("First Name")]
        [Required, StringLength(40)]
        public string FirstName { get; set; }

        [DisplayName("Last Name")]
        [Required, StringLength(40)]
        public string LastName { get; set; }

        [DisplayName("Email")]
        [Required, StringLength(50)]
        [DataType(DataType.EmailAddress)]
        public string Email { get; set; }

        [DisplayName("Date of Birth")]
        [Required]
        public DateTime DOB { get; set; }

        //Should be limited to 20, later will be hashed
        [DisplayName("Password")]
        [Required, StringLength(20, ErrorMessage = "The password must be a minimum of 6 characters and a maximum of 20"), MinLength(6)]
        [DataType(DataType.Password)]
        public string Password { get; set; }

        [DisplayName("Confirm Password")]
        [Required, Compare("Password", ErrorMessage = "The password and confirmation password do not match.")]
        [DataType(DataType.Password)]
        public string PasswordConfirm { get; set; }
    }

    public class AccountLogin
    {
        [DisplayName("Email")]
        [Required, StringLength(50)]
        [DataType(DataType.EmailAddress)]
        public string Email { get; set; }

        [DisplayName("Password")]
        [Required, StringLength(20), MinLength(6)]
        [DataType(DataType.Password)]
        public string Password { get; set; }
    }

    //public class AccountBase : AccountAdd
    //{
    //    public int Id { get; set; }

    //    [DisplayName("Last Login Date")]
    //    public DateTime LastLoginDate { get; set; }

    //    [DisplayName("Role Name")]
    //    [Required, StringLength(40)]
    //    public string RoleName { get; set; }

    //    [DisplayName("Previously Used Password")]
    //    [Required, StringLength(100)]
    //    public string SecondaryPassword { get; set; }

    //    [DisplayName("Has the Account Been Confirmed?")]
    //    [Required]
    //    public bool IsValid { get; set; }
    //}

    public class AccountEditEmail
    {
        public int Id { get; set; }

        [DisplayName("Email")]
        [Required, StringLength(50)]
        [DataType(DataType.EmailAddress)]
        public string Email { get; set; }
    }

    public class AccountEditPassword
    {
        public int Id { get; set; }

        [DisplayName("Password")]
        [Required, StringLength(20, ErrorMessage = "The password must be a minimum of 6 characters and a maximum of 20"), MinLength(6)]
        [DataType(DataType.Password)]
        public string Password { get; set; }

        [DisplayName("Confirm Password")]
        [Required, Compare("Password", ErrorMessage = "The password and confirmation password do not match.")]
        [DataType(DataType.Password)]
        public string PasswordConfirm { get; set; }
    }
}