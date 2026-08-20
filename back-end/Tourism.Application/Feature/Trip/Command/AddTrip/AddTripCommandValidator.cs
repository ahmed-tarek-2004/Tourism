using FluentValidation;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Tourism.Application.DTO.Trip;
using Tourism.Domain.Enums;

namespace Tourism.Application.Feature.Trip.Command.AddTrip
{
    public class AddTripCommandValidator : AbstractValidator<AddTripCommand>
    {
        public AddTripCommandValidator()
        {

            RuleFor(x => x.AddTrip.Name)
                 .NotEmpty()
                 .WithMessage("Trip name is required.")
                 .MaximumLength(200)
                 .WithMessage("Trip name must not exceed 200 characters.");

            RuleFor(x => x.AddTrip.DurationDays)
                .GreaterThan(0)
                .WithMessage("Duration days must be greater than 0.");

            RuleFor(x => x.AddTrip.StartDate)
                .GreaterThan(DateTime.UtcNow)
                .WithMessage("Start date must be in the future.");

            RuleFor(x => x.AddTrip.TransportationType)
                .IsInEnum()
                .WithMessage("Invalid transportation type.");

            RuleFor(x => x.AddTrip.Airline)
                .NotEmpty()
                .When(x => x.AddTrip.TransportationType == TransportationType.Air)
                .WithMessage("Airline is required when transportation type is Air.");

            //RuleFor(x => x.AddTrip.Airline)
            //    .IsInEnum()
            //    .When(x => x.AddTrip.Airline.HasValue)
            //    .WithMessage("Invalid airline.");


            RuleFor(x => x.AddTrip.Routes)
                    .NotNull()
                    .WithMessage("Routes are required.");

            RuleFor(x => x.AddTrip.Routes)
                .NotEmpty()
                .When(x => x.AddTrip.Routes != null)
                .WithMessage("At least one route is required.");

            RuleFor(x => x.AddTrip.Routes)
                .Must(routes =>
                    routes.Select(r => r.order)
                          .Distinct()
                          .Count() == routes.Count)
                .When(x => x.AddTrip.Routes != null)
                .WithMessage("Route order must be unique.");

            // Makkah Hotel
            RuleFor(x => x.AddTrip.MakkahHotel)
                .NotEmpty()
                .WithMessage("Makkah hotel is required.")
                .MaximumLength(200);

            RuleFor(x => x.AddTrip.MakkahNights)
                .GreaterThan(0)
                .WithMessage("Makkah nights must be greater than 0.");

            // Madinah Hotel
            RuleFor(x => x.AddTrip.MadinahHotel)
                .MaximumLength(200)
                .When(x => !string.IsNullOrWhiteSpace(x.AddTrip.MadinahHotel) && !string.IsNullOrEmpty(x.AddTrip.MakkahHotel));

            RuleFor(x => x.AddTrip.MadinahNights)
                .GreaterThan(0)
                .When(x => x.AddTrip.MadinahNights.HasValue && !string.IsNullOrEmpty(x.AddTrip.MadinahHotel) && !string.IsNullOrEmpty(x.AddTrip.MakkahHotel))
                .WithMessage("Madinah nights must be greater than 0.");

            //total nights
            RuleFor(x => x.AddTrip)
                  .Must(x =>
                      x.MakkahNights + (x.MadinahNights ?? 0) <= x.DurationDays)
                  .WithMessage("The total number of Makkah and Madinah nights cannot exceed the trip duration.");
            // Prices
            RuleFor(x => x.AddTrip.DoublePrice)
                .GreaterThanOrEqualTo(0)
                .When(x => x.AddTrip.DoublePrice.HasValue)
                .WithMessage("Double price cannot be negative.");

            RuleFor(x => x.AddTrip.TriplePrice)
                .GreaterThanOrEqualTo(0)
                .When(x => x.AddTrip.TriplePrice.HasValue)
                .WithMessage("Triple price cannot be negative.");

            RuleFor(x => x.AddTrip.QuadruplePrice)
                .GreaterThanOrEqualTo(0)
                .When(x => x.AddTrip.QuadruplePrice.HasValue)
                .WithMessage("Quadruple price cannot be negative.");

            // Image
            RuleFor(x => x.AddTrip.ImageUrl)
                .NotNull()
                .WithMessage("Trip image is required.")
                //.Must(file => file!.Length <= 5 * 1024 * 1024)
                .WithMessage("Image size must not exceed 5 MB.")
                .Must(file => (file != null) && (
                    file!.ContentType == "image/jpeg" ||
                    file.ContentType == "image/png" ||
                    file.ContentType == "image/jpg" ||
                    file.ContentType == "image/webp"))
                //.When(x=> x !=null )
                .WithMessage("images extension must be end with jpg or jpeg or png or webp.");
        }
    }
    public class RouteDTOValidator : AbstractValidator<RouteDTO>
    {
        public RouteDTOValidator()
        {
            RuleFor(x => x.name)
                .NotEmpty()
                .WithMessage("Route name is required.")
                .MaximumLength(200)
                .WithMessage("Route name must not exceed 200 characters.");

            RuleFor(x => x.order)
                .GreaterThan(0)
                .WithMessage("Route order must be greater than 0.");
        }
    }
}