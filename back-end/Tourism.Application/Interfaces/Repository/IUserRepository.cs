using Microsoft.AspNetCore.Identity;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Tourism.Domain.Models.Auth.Identity;

namespace Tourism.Application.Interfaces.Repository
{
    public interface IUserRepository
    {
        Task<User?> GetUserById(string Id);
        Task<User?> GetUserByEmail(string email);
        Task<List<string>> GetUserRole(User user);
        Task<bool>CheckPassword(User user,string password);
        Task<IdentityResult> UpdateUserSecurityStamp(User user);
    }
}
