using MediatR;
using Microsoft.Extensions.Logging;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Tourism.Application.Interfaces.Repository;
using Tourism.Application.Interfaces.Services;
using Tourism.Domain.Models;
using Tourism.Domain.Shared.Bases;

namespace Tourism.Application.Feature.Trip.Command.AddTrip
{
    public class AddTripCommandHandler(ITripRepository tripRepository, ResponseHandler responseHandler,
        IUnitOfWork unitOfWork, IMediaUploading mediaUploading, ILogger<AddTripCommandHandler> logger) 
        : IRequestHandler<AddTripCommand, Response<string>>
    {

        public async Task<Response<string>> Handle(AddTripCommand request, CancellationToken cancellationToken)
        {
            try
            {
                var trip = new Trips
                {
                    Airline = request.AddTrip.Airline,
                    CreatedAt = DateTime.UtcNow,
                    DoublePrice = request.AddTrip.DoublePrice,
                    TriplePrice = request.AddTrip.TriplePrice,
                    QuadruplePrice = request.AddTrip.QuadruplePrice,
                    DurationDays = request.AddTrip.DurationDays,
                    ImageUrl = await mediaUploading.UploadAsync(request.AddTrip.ImageUrl),
                    IncludesCustomerService = request.AddTrip.IncludesCustomerService,
                    IncludesFlightTickets = request.AddTrip.IncludesFlightTickets,
                    IncludesGuides = request.AddTrip.IncludesGuides,
                    IncludesUmrahVisa = request.AddTrip.IncludesUmrahVisa,
                    MadinahHotel = request.AddTrip.MadinahHotel,
                    MadinahNights = request.AddTrip.MadinahNights,
                    MakkahHotel = request.AddTrip.MakkahHotel,
                    MakkahNights = request.AddTrip.MakkahNights,
                    Name = request.AddTrip.Name,
                    StartDate = request.AddTrip.StartDate,
                    TransportationType = request.AddTrip.TransportationType,
                    UpdatedAt = DateTime.UtcNow,
                    Routes = request.AddTrip.Routes
                               .Select(b => new Route
                               {
                                   name = b.name,
                                   order = b.order,
                               })
                               .ToList()
                };
                Console.WriteLine($"Routes Count: {request.AddTrip.Routes?.Count}");
                var isAdded = await tripRepository.AddTripAsync(trip);
                if(!isAdded)
                {
                    throw new Exception();
                }
                await unitOfWork.SaveChangesAsync(cancellationToken);
                return responseHandler.Created(string.Empty, "trip Added successfully");

            }
            catch (Exception ex)
            {
                logger.LogError(ex.Message);
                return responseHandler.InternalServerError<string>("internal server error");
            }

        }
    }

}
