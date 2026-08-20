using MediatR;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Tourism.Application.DTO.Auth;
using Tourism.Domain.Shared.Bases;

namespace Tourism.Application.Feature.Auth.Login
{
    public sealed record LoginCommand(string email, string password) : IRequest<Response<LoginResponseDto>>;
}
