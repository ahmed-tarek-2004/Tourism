
using Hangfire;
using Hangfire.SqlServer;
using Microsoft.AspNetCore.DataProtection;
using Microsoft.AspNetCore.Identity;
using Scalar.AspNetCore;
using System.Text.Json.Serialization;
using Tourism.API.Common.Exceptions;
using Tourism.API.Common.Middleware;
//using Tourism.API.Hubs;
using Microsoft.OpenApi;

//using Tourism.API.Hubs;
using Tourism.Domain.Models.Auth.Identity;
using Tourism.Domain.Shared.Bases;
using Tourism.Extensions;
using Tourism.Infrastructure.Adapters.Cloudinary;
using Tourism.Infrastructure.Extensions;
using Tourism.Infrastructure.Persistence;
using Tourism.Infrastructure.Seeder;
using FirebaseAdmin;
using Google.Apis.Auth.OAuth2;
//using Tourism.Infrastructure.BackgroundJob.Dashboard;
using Tourism.Shared;
using OpenAI;
using Microsoft.Extensions.AI;

namespace Tourism
{
    public class Program
    {
        public static async Task Main(string[] args)
        {
            var builder = WebApplication.CreateBuilder(args);
            builder.Services.AddControllers();

            builder.Host.UseSerilogLogging();

            builder.Services.AddControllers()
             .ConfigureApiBehaviorOptions(options =>
             options.SuppressModelStateInvalidFilter = true)
             .AddJsonOptions(option =>
             {
                 option.JsonSerializerOptions.Converters.Add(new JsonStringEnumConverter());
             });

            builder.Services.AddSignalR();

            
            builder.Services.AddSwaggerConfiguration();
            builder.Services.AddDatabase(builder.Configuration);
            builder.Services.AddEmailServices(builder.Configuration);
            builder.Services.AddDistributedCache(builder.Configuration);
            builder.Services.AddScoped<ResponseHandler>();
            builder.Services.AddAuthenticationAndAuthorization(builder.Configuration);
            builder.Services.ApplicationService(builder.Configuration);
            builder.Services.AddEndpointsApiExplorer();
            builder.Services.Configure<Shared.CloudinarySettings>(builder.Configuration.GetSection("Cloudinary"));
            builder.Services.Configure<Shared.JwtSettings>(builder.Configuration.GetSection("JWT"));
            builder.Services.ApplyingMediatoR_Requirements();

            builder.Services.AddOpenApi();

            builder.Services.AddDataProtection()
              .PersistKeysToDbContext<ApplicationDbContext>()
              .SetApplicationName("Tourism");


            builder.Services.AddCors(opt =>
                {
                    opt.AddPolicy("AllowAll",
                        policy =>
                        {
                            policy.AllowAnyHeader()
                            .AllowAnyMethod()
                            .AllowCredentials()
                            .SetIsOriginAllowed(_ => true);
                        });
                });

            builder.Services.AddProblemDetails();
            builder.Services.AddExceptionHandler<GlobalExceptionHandler>();
            builder.Services.AddTransient<StopwatchRequestMiddleware>();
           
            //var apikey = builder.Configuration["OpenApi:ApiKey"];
            //builder.Services.AddChatClient(
            //    new OpenAIClient(apikey)
            //    .GetChatClient("gpt-4o-mini")
            //    .AsIChatClient());
            //builder.Services.AddDistributedMemoryCache();

            var app = builder.Build();

            await using (var scope = app.Services.CreateAsyncScope())
            {
                var context = scope.ServiceProvider.GetRequiredService<ApplicationDbContext>();
                var userManager = scope.ServiceProvider.GetRequiredService<UserManager<User>>();
                var roleManager = scope.ServiceProvider.GetRequiredService<RoleManager<Domain.Models.Auth.Identity.Role>>();
                var logger = scope.ServiceProvider.GetRequiredService<ILogger<UserAndRoleSeeder>>();
                await UserAndRoleSeeder.Seed(context, roleManager, userManager, logger);
            }


            // Configure the HTTP request pipeline.
            if (app.Environment.IsDevelopment() || app.Environment.IsProduction())
            {
                //app.MapOpenApi();
                //app.MapScalarApiReference();
                app.UseSwagger();
                app.UseSwaggerUI();
            }


            app.UseExceptionHandler();
            //app.UseProblemDetails();
            app.UseHttpsRedirection();
            app.UseRouting();
            app.UseCors("AllowAll");
            app.UseAuthentication();
            app.UseAuthorization();
            app.UseMiddleware<StopwatchRequestMiddleware>();
            //app.MapHub<NotificationHub>("/notificationHub").RequireAuthorization();
            //app.MapHub<MessgaeHub>("/messageHub").RequireAuthorization();

            //BackgroundJob.Schedule(() => Console.WriteLine("Hello From Scheduled TechMeter"), TimeSpan.FromSeconds(60));
            //BackgroundJob.Enqueue(() => Console.WriteLine("Hello From Enqueue TechMeter"));
            app.MapControllers();
            //app.UseHangfireDashboard("/hangfire", new DashboardOptions
            //{
            //    Authorization = new[] { new AllowAllDashboardAuthorizationFilter() }
            //});


            //app.MapPost("/chat", async (ChatRequest request, IChatClient chatClient) =>
            //{
            //    var response = await chatClient.GetResponseAsync(request.Message);
            //    return Results.Ok(response.Text);
            //});

            app.Run();
        }
        //record ChatRequest(string Message)
        //{
        //    public override string ToString() => Message;
        //}
    }
}


