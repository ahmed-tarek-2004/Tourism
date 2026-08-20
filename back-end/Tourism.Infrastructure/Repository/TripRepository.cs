using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Tourism.Application.DTO.Trip;
using Tourism.Application.Interfaces.Repository;
using Tourism.Domain.Models;
using Tourism.Infrastructure.Persistence;

namespace Tourism.Infrastructure.Repository
{
    public class TripRepository(ApplicationDbContext context) : ITripRepository
    {
        public async Task<bool> AddTripAsync(Trips trip)
        {
            try
            {
                await context.Trips.AddAsync(trip);
                var entries = context.ChangeTracker.Entries();

                foreach (var entry in entries)
                {
                    Console.WriteLine($"{entry.Entity.GetType().Name} - {entry.State}");
                }
                return true;
            }
            catch (Exception ex)
            {
                return false;
            }

        }

        public async Task<Trips> GetByIdAsync(int Id)
        {

            var trip = await context.Trips
                .Include(b=>b.Routes)
                .FirstOrDefaultAsync(b => b.Id == Id);
            //Console.WriteLine($"Trip id is : {trip.Id}");
            return trip!;

        }

        public async Task<List<Trips>> GetAllTripsAsync()
        {
            return await context.Trips
                .Include(b=>b.Routes)
                .ToListAsync();
        }

        public async Task<bool> RemoveTripAsync(Trips trip)
        {
            try
            {
                context.Trips.Remove(trip);
                return true;
            }
            catch
            {
                return false;
            }
        }
    }
}
