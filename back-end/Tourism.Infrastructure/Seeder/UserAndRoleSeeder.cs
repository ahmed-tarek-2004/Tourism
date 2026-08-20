using Microsoft.AspNetCore.Identity;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Logging;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Tourism.Domain.Models.Auth.Identity;
using Tourism.Infrastructure.Persistence;

namespace Tourism.Infrastructure.Seeder
{
    public class UserAndRoleSeeder
    {
        public static async Task Seed(ApplicationDbContext _context, RoleManager<Role> _roleManager,
            UserManager<User> _userManager, ILogger<UserAndRoleSeeder> _logger)
        {
            try
            {
                try
                {
                    if (!await _context.Database.CanConnectAsync())
                    {
                        Console.WriteLine("Database not Accessed");
                    }
                    else
                    {
                        var pending = await _context.Database.GetPendingMigrationsAsync();
                        _logger.LogInformation("Begin Updateing");
                        if (pending.Any())
                        {
                            _logger.LogInformation($"Applying migrations: {string.Join(", ", pending)}");
                           // await _context.Database.MigrateAsync();
                        }
                    }
                }
                catch (Exception ex)
                {
                    _logger.LogError(ex, "Migration failed!");
                    throw;

                }

                var PendingMigrations = await _context.Database.GetPendingMigrationsAsync();
                if (!PendingMigrations.Any())
                {
                    await _context.Database.MigrateAsync();

                }
                if (!await _roleManager.Roles.AnyAsync())
                {
                    string[] roles = { "admin" };

                    foreach (var role in roles)
                    {
                        await _roleManager.CreateAsync(new Role()
                        {
                            Id = Guid.NewGuid().ToString(),
                            Name = role,
                            NormalizedName = role.ToUpper()
                        });
                    }
                }
                if (!await _userManager.Users.AnyAsync())
                {
                    var Admin = new User()
                    {
                        Id = Guid.NewGuid().ToString(),
                        UserName = "Admin",
                        PhoneNumber = "01001722692",
                        Email = "admin@gmail.com",
                        EmailConfirmed = true,
                        Gender = Domain.Enums.Gender.male
                    };
                    //var user = new User()
                    //{
                    //    Id = Guid.NewGuid().ToString(),
                    //    UserName = "User",
                    //    PhoneNumber = "01030187018",
                    //    Email = "user@gmail.com",
                    //    EmailConfirmed = true,
                    //    Gender = Domain.Enums.Gender.male
                    //};
                    await _userManager.CreateAsync(Admin, "Admin123**");
                    await _userManager.AddToRoleAsync(Admin, "admin");
                    //await _userManager.CreateAsync(user, "User123**");
                    //await _userManager.AddToRoleAsync(user, "client");
                }
            }
            catch (Exception ex)
            {
                _logger.LogError("Something Went Wrong While Applying Migrations");
                throw;
            }

        }
    }
}


