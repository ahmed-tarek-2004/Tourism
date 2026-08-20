using MediatR;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Tourism.Application.Interfaces.Repository;
using Tourism.Domain.Shared.Bases;

namespace Tourism.Application.Feature.Trip.Command.RemoveTrip
{
    public class RemoveTripCommandHandler(ITripRepository tripRepository, IUnitOfWork unitOfWork,
        ResponseHandler responseHandler) : IRequestHandler<RemoveTripCommand, Response<string>>
    {
        public async Task<Response<string>> Handle(RemoveTripCommand request, CancellationToken cancellationToken)
        {
            var trip = await tripRepository.GetByIdAsync(request.Id);
            if (trip == null)
            {
                return responseHandler.NotFound<string>("Trip is not found");
            }
            await tripRepository.RemoveTripAsync(trip);
            await unitOfWork.SaveChangesAsync(cancellationToken);
            return responseHandler.Success(string.Empty, "Trip eleted Successfully");
        }
    }
}
