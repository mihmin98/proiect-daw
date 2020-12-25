using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Bookstore.Entities
{
    public class Book : BaseEntity
    {
        public String Title { get; set; }
        public DateTime? PublicationDate { get; set; }
        public int Quantity { get; set; }

        public int? AuthorId { get; set; }

        public virtual Author Author { get; set; }
        public virtual List<BookRental> BookRentals { get; set; }
    }
}