using MediatR;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Tourism.Domain.Shared.Bases;

namespace Tourism.Application.Feature.Contact
{
    public sealed record ContactCommand(string Name, string Phone, string Email, string Service, string Message) : IRequest<Response<string>>;
   
}
