using MediatR;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Security.Claims;
using System.Text;
using System.Threading.Tasks;
using Tourism.Domain.Models.Auth.Identity;
using Tourism.Domain.Shared.Bases;

namespace Tourism.Application.Feature.Auth.Logout
{
    public sealed record LogoutCommand(ClaimsPrincipal User):IRequest<Response<string>>;
}
