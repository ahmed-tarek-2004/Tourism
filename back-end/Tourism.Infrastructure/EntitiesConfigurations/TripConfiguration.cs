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
    public class TripConfiguration : IEntityTypeConfiguration<Trips>
    {
        public void Configure(EntityTypeBuilder<Trips> builder)
        {
            builder.HasKey(b => b.Id);

    
        }
    }
}


