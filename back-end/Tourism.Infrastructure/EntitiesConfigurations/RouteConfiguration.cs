using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Tourism.Domain.Models;

namespace Tourism.Infrastructure.EntitiesConfigurations
{
    public class RouteConfiguration : IEntityTypeConfiguration<Route>
    {
        public void Configure(EntityTypeBuilder<Route> builder)
        {
            builder.HasKey(x => x.Id);

            builder.HasOne(b => b.Trips)
                .WithMany(b => b.Routes)
                .HasForeignKey(b => b.tripId)
                .OnDelete(DeleteBehavior.Cascade);
        }
    }
}


