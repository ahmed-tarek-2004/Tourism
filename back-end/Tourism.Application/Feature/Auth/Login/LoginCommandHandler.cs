using MediatR;
using Microsoft.AspNetCore.Identity;
using Microsoft.Extensions.Logging;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Tourism.Application.DTO.Auth;
using Tourism.Application.Interfaces.Repository;
using Tourism.Application.Interfaces.Services.Token;
using Tourism.Domain.Shared.Bases;

namespace Tourism.Application.Feature.Auth.Login
{
    public class LoginCommandHandler(IUserRepository userRepository, ILogger<LoginCommandHandler> logger
        , ITokenService tokenService, ResponseHandler responseHandler) : IRequestHandler<LoginCommand, Response<LoginResponseDto>>
    {
        public async Task<Response<LoginResponseDto>> Handle(LoginCommand request, CancellationToken cancellationToken)
        {
            try
            {
                var user = await userRepository.GetUserByEmail(request.email);
                if (user == null)
                {
                    logger.LogWarning("User with Email {request.email} : Not Found", request.email);
                    return responseHandler.NotFound<LoginResponseDto>($"User with Email {request.email} : Not Found");
                }
                bool checkpassword = await userRepository.CheckPassword(user, request.password);
                if (!checkpassword)
                {
                    logger.LogWarning("request.password is Incorrext");
                    return responseHandler.BadRequest<LoginResponseDto>("request.password is InCorrect");
                }
                if (!user.EmailConfirmed)
                {
                    return responseHandler.BadRequest<LoginResponseDto>("verify Your request.email");
                }
                //if (string.IsNullOrEmpty(otp))
                //{
                //    otp = await otpService.GenerateAndSetOTP(user.Id);
                //    backgroundJobService.Enqueue<Irequest.emailService>(service => service.SendOtprequest.emailAsync(user.UserName ?? user.request.email ?? "User", user.request.email, otp)); logger.LogInformation($"Otp Sent is : {otp}");

                //    return responseHandler.Success<LoginResponseDto>(new LoginResponseDto { Id = user.Id }, "Oto Has sent via request.email Plz Confirm");
                //}
                //else
                //{
                //    var confirmOTP = await otpService.ValidateOtp(otp, user.Id);
                //    if (!confirmOTP)
                //    {
                //        return responseHandler.BadRequest<LoginResponseDto>("Enter A correct OTP");
                //    }
                //}
                var roles = await userRepository.GetUserRole(user);
                var token = await tokenService.GenerateTokensAsync(user, user.Id);
                var respone = new LoginResponseDto()
                {
                    Id = user.Id,
                    UserName = user.UserName,
                    Email = user.Email,
                    PhoneNumber = user.PhoneNumber,
                    //PhotoUrl = user.ProfileUrl,
                    Role = roles.FirstOrDefault(),
                    AccessToken = token.AccessToken,
                    RefreshToken = token.RefreshToken,
                    IsEmailConfirmed = user.EmailConfirmed,
                };
                logger.LogInformation("LoggedIn Successfully");
                return responseHandler.Success<LoginResponseDto>(respone, "User Logined in Successfully");
            }
            catch (Exception ex)
            {
                logger.LogInformation("Internal Server Error");
                return responseHandler.InternalServerError<LoginResponseDto>("Internal Server Error");
            }
        }
    }
}
