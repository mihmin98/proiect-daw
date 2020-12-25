using Bookstore.Data;
using Bookstore.Entities;
using Bookstore.IRepositories;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Bookstore.Repositories
{
    public class BookRentalRepository : GenericRepository<BookRental>, IBookRentalRepository
    {
        public BookRentalRepository(BookstoreDbContext context) : base(context)
        {
        }

        public BookRental GetByBookAndRental(int book, int rental)
        {
            return context.BookRentals.Where(x => x.BookId == book && x.RentalId == rental)
                .FirstOrDefault();
        }
    }
}