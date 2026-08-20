using MediatR;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Tourism.Domain.Shared.Bases;

namespace Tourism.Application.Feature.Trip.Command.RemoveTrip
{
    public sealed record RemoveTripCommand(int Id) : IRequest<Response<string>>;
}
