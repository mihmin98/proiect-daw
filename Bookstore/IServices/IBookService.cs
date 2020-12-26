using Bookstore.Entities;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Bookstore.IServices
{
    public interface IBookService {
        List<Book> GetAll();
        Book GetById(int id);
        bool Insert(Book book);
        bool Update(Book book);
        bool Delete(int id);
    }
}