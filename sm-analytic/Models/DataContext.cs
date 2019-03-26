using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Identity.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore;

namespace sm_analytic.Models
{
    public partial class DataDbContext : IdentityDbContext<IdentityCustomModel>
    {
        private readonly IHttpContextAccessor _httpContextAccessor;

        public DataDbContext(DbContextOptions<DataDbContext> dbContextOptions, IHttpContextAccessor httpContextAccessor) 
            : base(dbContextOptions)
        {
            _httpContextAccessor = httpContextAccessor;
        }
        public string GetUser()
        {
            return _httpContextAccessor.HttpContext.User.Identity.Name;
        }

        //public virtual DbSet<RequestTracker> RequestTrackers { get; set; }

        public virtual DbSet<Account> Accounts { get; set; }

        //protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
        //{
        //    //optionsBuilder.UseSqlServer("DefaultConnection");
        //}

        //protected override void OnModelCreating(ModelBuilder modelBuilder)
        //{
        //    base.OnModelCreating(modelBuilder);

        //    //modelBuilder.Entity<Account>()
        //    //    .HasOne(i => i.IdentityCustomModel)
        //    //    .IsRequired(true);

        //    //modelBuilder.Entity<RequestTracker>()
        //    //    .HasOne(i => i.Account)
        //    //    .WithOne(i => i.RequestTracker)
        //    //    .IsRequired(true);
                
        //}
    }
}
