using Microsoft.AspNetCore.DataProtection.EntityFrameworkCore;
using Microsoft.AspNetCore.Identity.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore;
using Tourism.Application.Common;
using Tourism.Application.Interfaces.Repository;
using Tourism.Domain.Models;
using Tourism.Domain.Models;
using Tourism.Domain.Models.Auth;
using Tourism.Domain.Models.Auth.Identity;
//using Tourism.Domain.Models.Auth.Users;
//using Tourism.Infrastructure.EntitiesConfigurations;
using Tourism.Domain.Models.Auth.UserTokens;

namespace Tourism.Infrastructure.Persistence
{
    public class ApplicationDbContext : IdentityDbContext<User, Role, string>, IDataProtectionKeyContext
    {
        public ApplicationDbContext(DbContextOptions<ApplicationDbContext> options) : base(options)
        {

        }
        public DbSet<DataProtectionKey> DataProtectionKeys { get; set; }
       
        public DbSet<UserRefreshToken> UserRefreshTokens { get; set; }
        public DbSet<Trips> Trips { get; set; }
        public DbSet<Route> Routes { get; set; }
        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            base.OnModelCreating(modelBuilder);
            modelBuilder.ApplyConfigurationsFromAssembly(typeof(ApplicationDbContext).Assembly);
        }
        protected override void ConfigureConventions(ModelConfigurationBuilder configurationBuilder)
        {
            configurationBuilder
                .Properties<Enum>()
                .HaveConversion<string>();
        }
       
    }
}


