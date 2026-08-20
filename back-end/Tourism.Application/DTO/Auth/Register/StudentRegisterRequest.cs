using Microsoft.AspNetCore.Http;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Tourism.Domain.Enums;

namespace Tourism.Application.DTO.Auth.Register
{
    public record StudentRegisterRequest(string UserName, string Email, string PhoneNumber,
        string Password, string PassworfConfirmed, string Country, IFormFile? ProfilePhoto,
        Gender Gender, DateTime BirthDate, string EducationLevel);
}


