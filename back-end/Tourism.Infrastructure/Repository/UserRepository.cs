using Microsoft.AspNetCore.Identity;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Tourism.Application.Interfaces.Repository;
using Tourism.Domain.Models.Auth.Identity;

namespace Tourism.Infrastructure.Repository
{
    public class UserRepository(UserManager<User>userManager) : IUserRepository
    {
        public async Task<bool> CheckPassword(User user,string password)
        {
            return await userManager.CheckPasswordAsync(user, password);
        }

        public async Task<User?> GetUserByEmail(string email)
        {
            return await userManager.FindByEmailAsync(email);
        }

        public async Task<User?> GetUserById(string Id)
        {
            return await userManager.FindByIdAsync(Id);
        }

        public async Task<List<string>> GetUserRole(User user)
        {
            var roles= await userManager.GetRolesAsync(user);
            return roles.ToList();
        }

        public async Task<IdentityResult> UpdateUserSecurityStamp(User user)
        {
            return await userManager.UpdateSecurityStampAsync(user);
        }
    }
}
