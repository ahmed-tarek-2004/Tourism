using Microsoft.AspNetCore.Http;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Tourism.Domain.Enums;

namespace Tourism.Application.DTO.Trip
{
    public class AddTripRequest
    {
        public string Name { get; set; } = null!;
        public int DurationDays { get; set; }
        public DateTime StartDate { get; set; }
        public TransportationType TransportationType { get; set; }
        public string? Airline { get; set; }
        public List<RouteDTO> Routes { get; set; }
        // Hotels
        public string MakkahHotel { get; set; } = null!;
        public int MakkahNights { get; set; }

        public string? MadinahHotel { get; set; } = null!;
        public int? MadinahNights { get; set; }

        // Prices
        public decimal? DoublePrice { get; set; }
        public decimal? TriplePrice { get; set; }
        public decimal? QuadruplePrice { get; set; }

        // Included Services
        public bool IncludesFlightTickets { get; set; } = true;
        public bool IncludesUmrahVisa { get; set; } = true;
        public bool IncludesGuides { get; set; } = true;
        public bool IncludesCustomerService { get; set; } = true;

        // Image
        public IFormFile? ImageUrl { get; set; }

    }
}
