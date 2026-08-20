using Microsoft.AspNetCore.DataProtection.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Infrastructure;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Security.Cryptography.X509Certificates;
using System.Text;
using System.Threading.Tasks;
using Tourism.Domain.Models;
using Tourism.Domain.Models.Auth;
//using Tourism.Domain.Models.Auth.Users;
using Tourism.Domain.Models.Auth.UserTokens;

namespace Tourism.Application.Common
{
    public interface IApplicationDbContext
    {
        public DbSet<DataProtectionKey> DataProtectionKeys { get; set; }

        public DbSet<UserRefreshToken> UserRefreshTokens { get; set; }
        //public DbSet<Notification> Notification { get; set; }
        //public DbSet<UserConnections> UserConnections { get; set; }
        //public DbSet<UserMessages> UserMessages { get; set; }
        //public DbSet<FcmUserTokens> FcmUserTokens { get; set; }
        Task<int> SaveChangesAsync(CancellationToken cancellationToken);
    }
}


