using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Tourism.Application.DTO.Question
{
    public class ContactRequest
    {
        public string Name { get; set; } = null!;
        public string Phone { get; set; } = null!;
        public string Email { get; set; } = null!;
        public string Service { get; set; } = null!;
        public string Message { get; set; } = null!;
    }
}
