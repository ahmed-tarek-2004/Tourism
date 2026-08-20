using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Tourism.Domain.Models.Auth.Identity;

namespace Tourism.Domain.Models.Auth.UserTokens
{
    public class UserRefreshToken
    {
        [Key]
        public Guid Id { get; set; }
        public string UserId { get; set; }
        public string? Token { get; set; }
        public bool IsUsed { get; set; }
        public DateTime ExpiryDateUtc { get; set; }
        public virtual User? User { get; set; }
    }
}


