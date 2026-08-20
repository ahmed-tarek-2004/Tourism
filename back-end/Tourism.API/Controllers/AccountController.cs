using FluentValidation;
using MediatR;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.RateLimiting;
using StackExchange.Redis;
using System.Net;
using System.Reflection;
using System.Security.Claims;
using Tourism.Application.DTO.Auth.Login;
using Tourism.Application.DTO.Auth.Register;
using Tourism.Application.DTO.Auth.ResetPassword;
using Tourism.Application.DTO.Otp;
using Tourism.Application.Feature.Auth.Login;
using Tourism.Application.Feature.Auth.Logout;
using Tourism.Domain.Models;
using Tourism.Domain.Models.Auth.Identity;
using Tourism.Domain.Shared.Bases;

namespace Tourism.API.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class AccountController : ControllerBase
    {

        private readonly ILogger<AccountController> _logger;
        private readonly IMediator _mediator;

        public AccountController(ILogger<AccountController> logger,
              ResponseHandler responseHandler, IMediator mediator)
        {
            _logger = logger;
            _mediator = mediator;
        }

        [HttpPost("login")]
        public async Task<ActionResult<Response<StudentRegisterResponse>>> LoginAsync([FromBody] LoginRequestDto request)
        {
            var response = await _mediator.Send(new LoginCommand(request.email, request.password));
            return StatusCode((int)response.StatusCode, response);
        }

        
        [HttpPost("logout")]
        public async Task<ActionResult<string>> LogoutAsync()
        {
            var response = await _mediator.Send(new LogoutCommand(User));
            return StatusCode((int)response.StatusCode, response);
        }
        //private string GetUserId()
        //{
        //    return User.FindFirst(ClaimTypes.NameIdentifier)?.Value!;
        //}
    }
}


