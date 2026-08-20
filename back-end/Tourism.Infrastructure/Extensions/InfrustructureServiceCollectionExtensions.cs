using MediatR;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using StackExchange.Redis;
using Stripe;
using System.Net;
using System.Net.Mail;
using Tourism.Application.Common;
using Tourism.Application.Interfaces;
using Tourism.Application.Interfaces.Services;
using Tourism.Application.Interfaces.Services.Token;
using Tourism.Infrastructure.Adapters.Cloudinary;
using Tourism.Infrastructure.Adapters.EmailSender;
using Tourism.Shared;
using Tourism.Infrastructure.Persistence;
using Tourism.Application.Interfaces.Repository;
using Tourism.Infrastructure.Repository;
using Tourism.Application.Interfaces.Services.Email;


namespace Tourism.Infrastructure.Extensions
{
    public static class InfrustructureServiceCollectionExtensions
    {
        public static IServiceCollection AddDatabase(this IServiceCollection service, IConfiguration configuration)
        {
            service.AddDbContext<ApplicationDbContext>(opt =>
            {
                opt.UseSqlServer(configuration.GetConnectionString("ProdCS"));
            });
            return service;
        }
        public static IServiceCollection AddDistributedCache(this IServiceCollection services, IConfiguration configurations)
        {
            services.AddSingleton<IConnectionMultiplexer>(cm =>
            {
                var configuration = ConfigurationOptions.Parse(configurations.GetConnectionString("Redis")!);
                configuration.AbortOnConnectFail = false;
                return ConnectionMultiplexer.Connect(configuration);
            });
            return services;
        }

        public static IServiceCollection ApplicationService(this IServiceCollection services,IConfiguration configuration)
        {
            
            services.AddScoped<IEmailService, EmailService>();
            services.AddScoped<IMediaUploading, CloudinaryImageService>();
            services.AddScoped<ITokenService,Tourism.Infrastructure.Services.TokenService.TokenService>();
            services.AddScoped<ITripRepository,TripRepository>();
            services.AddScoped<IUserRepository,UserRepository>();
            services.AddScoped<IUnitOfWork,UnitOfWork>();
            services.Configure<EmailSettings>(configuration.GetSection("EmailSettings"));

            return services;
        }
        
    }
}


