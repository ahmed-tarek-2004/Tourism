using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Tourism.Domain.Models
{
    public class Route
    {
        public int Id { get; set; }
        public string name { get; set; }
        public int order { get; set; }
        public Trips Trips { get; set; }
        public int tripId { get; set; }
    }
}


