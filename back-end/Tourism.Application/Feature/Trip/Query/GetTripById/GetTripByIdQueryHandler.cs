using MediatR;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Tourism.Application.DTO.Trip;
using Tourism.Application.Interfaces.Repository;
using Tourism.Domain.Shared.Bases;

namespace Tourism.Application.Feature.Trip.Query.GetTripById
{
    public class GetTripByIdQueryHandler(ITripRepository tripRepository, ResponseHandler responseHandler) : IRequestHandler<GetTripByIdQuery, Response<GetTripResponse>>
    {
        public async Task<Response<GetTripResponse>> Handle(GetTripByIdQuery request, CancellationToken cancellationToken)
        {
            var trip = await tripRepository.GetByIdAsync(request.Id);
            if (trip == null)
            {
                return responseHandler.NotFound<GetTripResponse>("Trip is not found");
            }
            //foreach (var i in trip.Routes)
            //{
            //    Console.WriteLine($"Route is : {i.name}");
            //}
            var response = new GetTripResponse()
            {

                Id = trip.Id,
                Airline = trip.Airline,
                //CreatedAt = trip.CreatedAt,
                DoublePrice = trip.DoublePrice,
                DurationDays = trip.DurationDays,
                ImageUrl = trip.ImageUrl,
                IncludesCustomerService = trip.IncludesCustomerService,
                IncludesFlightTickets = trip.IncludesFlightTickets,
                IncludesGuides = trip.IncludesGuides,
                IncludesUmrahVisa = trip.IncludesUmrahVisa,
                MadinahHotel = trip.MadinahHotel??"",
                MadinahNights = trip.MadinahNights ?? 0,
                MakkahHotel = trip.MakkahHotel,
                MakkahNights = trip.MakkahNights,
                Name = trip.Name,
                QuadruplePrice = trip.QuadruplePrice,
                Routes = trip.Routes?.Select(b => new RouteDTO
                {
                    Id = b.Id,
                    name = b.name,
                    order = b.order
                }).ToList()??new List<RouteDTO>(),
                StartDate = trip.StartDate,
                TransportationType = trip.TransportationType,
                TriplePrice = trip.TriplePrice,
                //UpdatedAt = trip.UpdatedAt
            };
            return responseHandler.Success(response, "Trip by Id returned successfully");
        }
    }
}
