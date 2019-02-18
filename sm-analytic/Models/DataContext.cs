using Microsoft.AspNetCore.Identity.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore;

namespace sm_analytic.Models
{
    public partial class DataDbContext : IdentityDbContext<IdentityCustomModel>
    {
        public DataDbContext(DbContextOptions dbContextOptions) : base(dbContextOptions)
        {}

        public virtual DbSet<RequestTracker> RequestTrackers { get; set; }

        public virtual DbSet<Account>        Accounts { get; set; }

        protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
        {
            //optionsBuilder.UseSqlServer("DefaultConnection");
        }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            base.OnModelCreating(modelBuilder);

            modelBuilder.Entity<Account>()
                .HasOne(i => i.RequestTracker)
                .WithOne(i => i.Account)
                .IsRequired(true);

            //modelBuilder.Entity<RequestTracker>()
            //    .HasOne(i => i.Account)
            //    .WithOne(i => i.RequestTracker)
            //    .IsRequired(true);
                
        }
    }
}
