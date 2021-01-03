using Bookstore.Entities;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Bookstore.IServices
{
    public interface IRentalService {
        List<Rental> GetAll();
        Rental GetById(int id);
        bool Insert(Rental rental);
        public int InsertAndReturnId(Rental rental);
        bool Update(Rental rental);
        bool Delete(int id);

        bool AddBook(BookRental payload);
    }
}