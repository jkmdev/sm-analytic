using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Web;

namespace backend.Models
{
    public class Account
    {
        [Key]
        public int Id { get; set; }

        [Required, StringLength(40)]
        public string FirstName { get; set; }

        [Required, StringLength(40)]
        public string LastName { get; set; }

        [Required, StringLength(50)]
        public string Email { get; set; }

        public DateTime DOB { get; set; }

        public DateTime LastLoginDate { get; set; }

        [Required, StringLength(30)]
        public string RoleName { get; set; }

        [Required, StringLength(100)]
        public string Password { get; set; }

        [Required, StringLength(100)]
        public string SecondaryPassword { get; set; }

        [Required]
        public bool IsValid { get; set; }



    }

    public class Role
    {
        [Key, StringLength(40)]
        public string RoleName { get; set; }

        [Required, StringLength(120)]
        public string Description { get; set; }
    }

    public class RequestTracker
    {
        [Key]
        public int AccountId { get; set; }

        [Required]
        public int SearchRegularNum { get; set; }

        [Required]
        public int SearchRegularLimit { get; set; }

        [Required]
        public int SearchBasicNum { get; set; }

        [Required]
        public int SearchBasicLimit { get; set; }

        public DateTime LastRequest { get; set; }


    }

}