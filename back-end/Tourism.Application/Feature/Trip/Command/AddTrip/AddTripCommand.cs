using MediatR;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Tourism.Application.DTO.Trip;
using Tourism.Domain.Shared.Bases;

namespace Tourism.Application.Feature.Trip.Command.AddTrip
{
    public sealed record AddTripCommand(AddTripRequest AddTrip) : IRequest<Response<string>>;

}
