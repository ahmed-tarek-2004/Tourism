using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Tourism.Application.DTO.Trip;
using Tourism.Domain.Models;
using Tourism.Domain.Shared.Bases;

namespace Tourism.Application.Interfaces.Repository
{
    public interface ITripRepository
    {
        Task<bool> AddTripAsync(Trips trips);
        Task<bool> RemoveTripAsync(Trips trip);
        Task<Trips> GetByIdAsync(int Id);
        Task<List<Trips>> GetAllTripsAsync();
    }
}
