using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Bookstore.Entities
{
    public class Rental : BaseEntity
    {
        public DateTime RentalDate { get; set; }
        public DateTime ReturnDate { get; set; }

        public int ClientId { get; set; }
        public int TransactionId { get; set; }

        public virtual Transaction Transaction { get; set; }
        public virtual Client Client { get; set; }
        public virtual List<BookRental> BookRentals { get; set; }
    }
}