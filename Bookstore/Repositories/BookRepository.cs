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
    public class BookRepository : GenericRepository<Book>, IBookRepository
    {
        public BookRepository(BookstoreDbContext context) : base(context)
        {
        }

        public Book GetByIdJoined(int id)
        {
            Book book = context.Books.Where(x => x.Id == id)
                .Include(x => x.Author)
                .Include(x => x.BookRentals)
                .FirstOrDefault();

            return book;
        }
    }
}