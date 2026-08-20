using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Tourism.Application.Interfaces.Repository;
using Tourism.Infrastructure.Persistence;

namespace Tourism.Infrastructure.Repository
{
    public class UnitOfWork(ApplicationDbContext context) : IUnitOfWork
    {
        public async Task<int> SaveChangesAsync(CancellationToken cancellationToken = default)
        {
           return await context.SaveChangesAsync(cancellationToken);
        }
    }
}
