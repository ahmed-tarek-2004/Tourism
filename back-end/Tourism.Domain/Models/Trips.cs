using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Tourism.Domain.Enums;

namespace Tourism.Domain.Models
{
    public class Trips
    {
        public int Id { get; set; }
        public string Name { get; set; } = null!;
        public int DurationDays { get; set; }
        public DateTime StartDate { get; set; }
        public TransportationType TransportationType { get; set; }
        public string? Airline { get; set; }
        public List<Route> Routes { get; set; }
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
        public bool IncludesFlightTickets { get; set; }
        public bool IncludesUmrahVisa { get; set; }
        public bool IncludesGuides { get; set; }
        public bool IncludesCustomerService { get; set; }

        // Image
        public string? ImageUrl { get; set; }

        // Metadata
        public DateTime CreatedAt { get; set; }
        public DateTime? UpdatedAt { get; set; }
    }
}


