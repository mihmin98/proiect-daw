using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Bookstore.Entities
{
    public class BookRental : BaseEntity
    {
        public int BookId { get; set; }
        public int RentalId { get; set; }


        public virtual Book Book { get; set; }
        public virtual Rental Rental { get; set; }
    }
}