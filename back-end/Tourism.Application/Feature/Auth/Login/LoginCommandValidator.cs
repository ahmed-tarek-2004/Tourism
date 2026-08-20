using FluentValidation;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Tourism.Application.Feature.Auth.Login
{
    public class LoginCommandValidator:AbstractValidator<LoginCommand>
    {
        public LoginCommandValidator() 
        {
            RuleFor(b => b.email)
                .NotEmpty()
                .WithMessage("email must not be empty")
                .EmailAddress()
                .WithMessage("Please enter a valid email address.");

            RuleFor(b => b.password)
                .NotEmpty()
                .WithMessage("password is required")
                .MinimumLength(3);
                //.WithMessage()

        }
    }
}
