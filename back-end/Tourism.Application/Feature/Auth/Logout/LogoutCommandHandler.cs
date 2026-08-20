using MediatR;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Security.Claims;
using System.Text;
using System.Threading.Tasks;
using Tourism.Application.Interfaces.Repository;
using Tourism.Application.Interfaces.Services.Token;
using Tourism.Domain.Shared.Bases;

namespace Tourism.Application.Feature.Auth.Logout
{
    public class LogoutCommandHandler(IUserRepository userRepository, ITokenService tokenService,
        ResponseHandler responseHandler) : IRequestHandler<LogoutCommand, Response<string>>
    {
        public async Task<Response<string>> Handle(LogoutCommand request, CancellationToken cancellationToken)
        {
            var user = await userRepository.GetUserById(request.User.FindFirst(ClaimTypes.NameIdentifier).Value!);
            if (user == null)
            {
                return responseHandler.NotFound<string>("user is not found");
            }
            await tokenService.InValidateOldTokenAsync(user.Id);
            await userRepository.UpdateUserSecurityStamp(user);
            return responseHandler.Success<string>(string.Empty, "User Logout Successfully");

        }
    }
}
