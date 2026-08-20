using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Tourism.Domain.Enums;

namespace Tourism.Domain.Models
{
    public class Hotel
    {
        public int Id { get; set; }
        public string Name { get; set; }
        public int nights { get; set; }
        public hotellocation hotellocation {  get; set; }
        public int tripId { get; set; }
        public Trips Trips { get; set; }
    }
}


