using Bookstore.Entities;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Bookstore.IRepositories
{
    public interface IRentalRepository : IGenericRepository<Rental>
    {
        Rental GetByIdJoined(int id);
    }
}