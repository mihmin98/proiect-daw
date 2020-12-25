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
    public class RentalRepository : GenericRepository<Rental>, IRentalRepository
    {
        public RentalRepository(BookstoreDbContext context) : base(context)
        {
        }

        public Rental GetByIdJoined(int id)
        {
            Rental rental = context.Rentals.Where(x => x.Id == id)
                .Include(x => x.Transaction)
                .Include(x => x.Client)
                .Include(x => x.BookRentals)
                .FirstOrDefault();

            return rental;
        }
    }
}