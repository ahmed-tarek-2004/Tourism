using MediatR;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Tourism.Application.DTO.Trip;
using Tourism.Application.Interfaces.Repository;
using Tourism.Domain.Shared.Bases;

namespace Tourism.Application.Feature.Trip.Query.GetAllTrips
{
    public class GetAllTripQueryHandler(ITripRepository tripRepository,ResponseHandler responseHandler,
        IUnitOfWork unitOfWork) : IRequestHandler<GetAllTripQuery, Response<List<GetTripResponse>>>
    {
        public async Task<Response<List<GetTripResponse>>> Handle(GetAllTripQuery request, CancellationToken cancellationToken)
        {
            var trips = await tripRepository.GetAllTripsAsync();
            var response = trips.Select(b => new GetTripResponse
            {
                Id = b.Id,
                Airline = b.Airline,
                //CreatedAt = b.CreatedAt,
                DoublePrice = b.DoublePrice,
                DurationDays = b.DurationDays,
                ImageUrl = b.ImageUrl,
                IncludesCustomerService = b.IncludesCustomerService,
                IncludesFlightTickets = b.IncludesFlightTickets,
                IncludesGuides = b.IncludesGuides,
                IncludesUmrahVisa = b.IncludesUmrahVisa,
                MadinahHotel = b.MadinahHotel,
                MadinahNights = b.MadinahNights ?? 0,
                MakkahHotel = b.MakkahHotel,
                MakkahNights = b.MakkahNights,
                Name = b.Name,
                QuadruplePrice = b.QuadruplePrice,
                Routes = b.Routes.Select(b => new RouteDTO
                {
                    Id = b.Id,
                    name = b.name,
                    order = b.order
                }).ToList(),
                StartDate = b.StartDate,
                TransportationType = b.TransportationType,
                TriplePrice = b.TriplePrice,
                //UpdatedAt = b.UpdatedAt,
            }).ToList();
            return responseHandler.Success(response, "All Trips Returned Successfully");
        }
    }
}
