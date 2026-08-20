using FluentValidation;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Tourism.Application.Feature.Trip.Command.EditTrip
{
    public class EditTripCommandValidator : AbstractValidator<EditTripCommand>
    {
        public EditTripCommandValidator()
        {
            RuleFor(x => x.EditTrip)
                .Must(x =>
                    x.MakkahNights + (x.MadinahNights ?? 0) <= x.DurationDays)
                .When(b => b.EditTrip.MakkahNights.HasValue)
                .WithMessage("The total number of Makkah and Madinah nights cannot exceed the trip duration.");

            

            RuleFor(x => x.EditTrip.Routes)
                .Must(routes =>
                    routes.Select(r => r.order)
                          .Distinct()
                          .Count() == routes.Count)
                .When(x => x.EditTrip.Routes != null)
                .WithMessage("Route order must be unique.");
        }
    }
}
