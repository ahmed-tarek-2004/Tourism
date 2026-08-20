using Microsoft.AspNetCore.Identity;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Tourism.Domain.Enums;

namespace Tourism.Domain.Models.Auth.Identity
{
    public class User : IdentityUser<string>
    {
        //public string? ProfileUrl { get; set; }
        public Gender? Gender { get; set; }
        //public ICollection<UserConnections> UserConnections { get; set; }
        //public ICollection <UserMessages> SenderMessages { get; set; }
        //public ICollection<UserMessages> ReceivedMessages { get; set; } = [];
        //public ICollection<FcmUserTokens> FcmUserTokens { get; set; }

    }
}


