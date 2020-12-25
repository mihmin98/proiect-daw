using Bookstore.Entities;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Bookstore.IRepositories
{
    public interface IBookRentalRepository : IGenericRepository<BookRental>
    {
        BookRental GetByBookAndRental(int book, int rental);
    }
}