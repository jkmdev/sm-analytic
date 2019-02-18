using sm_analytic.Models;
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Web;

namespace sm_analytic.Models
{
    [Table("Account")]

    public partial class Account
    {
        public Account()
        {
            DOB = DateTime.Now.AddYears(-30);
            RequestTracker = new RequestTracker();
            //IdentityCustomModel = new IdentityCustomModel();
        }

        [DataType(DataType.Date)]
        public DateTime DOB { get; set; }

        public int Id { get; set; }

        public string IdentityCustomModelId { get; set; } //FK in the DB (should be used by Entity Framework)
        
        public IdentityCustomModel IdentityCustomModel { get; set; } //Nav property

        public virtual RequestTracker RequestTracker { get; set; }
    }

    [Table("RequestTracker")]

    public partial class RequestTracker
    {
        public RequestTracker()
        {
            LastRequest = DateTime.Now;
            //Account = new Account();
        }

        //PK and FK
        [Key]
        public int AccountId { get; set; }

        [Range(0, 250)]
        public int SearchRegularNum { get; set; }

        [Range(0, 250)]
        public int SearchRegularLimit { get; set; }

        [Range(0, 50)]
        public int SearchBasicNum { get; set; }

        [Range(0, 50)]
        public int SearchBasicLimit { get; set; }

        public DateTime LastRequest { get; set; }

        public virtual Account Account { get; set; }
    }

}