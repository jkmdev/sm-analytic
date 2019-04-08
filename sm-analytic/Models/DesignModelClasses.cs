using sm_analytic.Models;
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Web;

namespace sm_analytic.Models
{
    public partial class Account
    {
        public Account()
        {
            //IdentityCustomModel = new IdentityCustomModel();
        }

        public int Id { get; set; }

        public string IdentityCustomModelId { get; set; } //FK in the DB (should be used by Entity Framework)

        public IdentityCustomModel IdentityCustomModel { get; set; } //Nav property

        //Request Tracking part of the acc
        [Range(0, 250)]
        public int SearchRegularNum { get; set; }

        [Range(0, 250)]
        public int SearchRegularLimit { get; set; }

        [Range(0, 50)]
        public int SearchBasicNum { get; set; }

        [Range(0, 50)]
        public int SearchBasicLimit { get; set; }

        public DateTime LastRequest { get; set; }

    }

    public class EmailMessage
    {
        public string Destination { get; set; }

        public string Message { get; set; }
    }
}
