using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Bookstore.Entities
{
    public class Client : BaseEntity
    {
        public String Name { get; set; }
        public String Email { get; set; }

        public virtual List<Rental> Rentals { get; set; }
    }
}