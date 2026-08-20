using MediatR;
using Microsoft.AspNetCore.Routing;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Tourism.Application.Interfaces.Repository;
using Tourism.Application.Interfaces.Services;
using Tourism.Domain.Shared.Bases;

namespace Tourism.Application.Feature.Trip.Command.EditTrip
{
    public class EditTripCommandHandler(ITripRepository tripRepository, IMediaUploading mediaUploading,
        IUnitOfWork unitOfWork, ResponseHandler responseHandler) : IRequestHandler<EditTripCommand, Response<string>>
    {
        public async Task<Response<string>> Handle(EditTripCommand request, CancellationToken cancellationToken)
        {
            var trip = await tripRepository.GetByIdAsync(request.Id);
            if (trip == null)
            {
                return responseHandler.NotFound<string>("Trip is not found");
            }
            if (!string.IsNullOrEmpty(request.EditTrip.Name))
            {
                trip.Name = request.EditTrip.Name;
            }

            if (request.EditTrip.DurationDays.HasValue)
            {
                trip.DurationDays = request.EditTrip.DurationDays.Value;
            }
            if (request.EditTrip.DoublePrice.HasValue)
            {
                trip.DoublePrice = request.EditTrip.DoublePrice.Value;
            }
            if (request.EditTrip.TriplePrice.HasValue)
            {
                trip.TriplePrice = request.EditTrip.TriplePrice.Value;
            }
            if (request.EditTrip.QuadruplePrice.HasValue)
            {
                trip.QuadruplePrice = request.EditTrip.QuadruplePrice.Value;
            }
            if (request.EditTrip.ImageUrl != null)
            {
                trip.ImageUrl = await mediaUploading.UploadAsync(request.EditTrip.ImageUrl);
            }
            if (!string.IsNullOrEmpty(request.EditTrip.MakkahHotel))
            {
                trip.MakkahHotel = request.EditTrip.MakkahHotel;
            }
            if (request.EditTrip.MakkahNights.HasValue)
            {
                trip.MakkahNights = request.EditTrip.MakkahNights.Value;
            }
            if (!string.IsNullOrEmpty(request.EditTrip.MadinahHotel))
            {
                trip.MadinahHotel = request.EditTrip.MadinahHotel;
            }
            if (request.EditTrip.MadinahNights.HasValue)
            {
                trip.MadinahNights = request.EditTrip.MadinahNights.Value;
            }
            if (request.EditTrip.StartDate.HasValue)
            {
                trip.StartDate = request.EditTrip.StartDate.Value;
            }

            if (request.EditTrip.Routes != null && request.EditTrip.Routes.Any())
            {
                var routesById = trip.Routes.ToDictionary(x => x.Id);

                foreach (var routeRequest in request.EditTrip.Routes)
                {
                    if (routesById.TryGetValue(routeRequest.Id, out var route))
                    {
                        route.name = routeRequest.name;
                        route.order = routeRequest.order;
                    }
                }
            }

            if (request.EditTrip.TransportationType.HasValue)
            {
                trip.TransportationType = request.EditTrip.TransportationType.Value;
                if (request.EditTrip.TransportationType != Domain.Enums.TransportationType.Air)
                {
                    trip.Airline = request.EditTrip.TransportationType == Domain.Enums.TransportationType.Land ? "برّي" : "بحري";
                    trip.Routes.Clear();
                    trip.Routes = new List<Domain.Models.Route>
                    {
                        new Domain.Models.Route
                        {
                            name =  request.EditTrip.TransportationType == Domain.Enums.TransportationType.Land ? "برّي" : "بحري",
                            order = 1
                        }
                    };
                }

            }


            if (!string.IsNullOrEmpty(request.EditTrip.Airline))
            {
                trip.Airline = request.EditTrip.Airline;
                //if(request.EditTrip.Airline!= "بري")
            }
            await unitOfWork.SaveChangesAsync(cancellationToken);
            return responseHandler.Success(string.Empty, "Trip updated successfully");
        }
    }
}
