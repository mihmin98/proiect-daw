using Bookstore.Entities;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Bookstore.IServices
{
    public interface IAuthorService {
        List<Author> GetAll();
        Author GetById(int id);
        bool Insert(Author author);
        bool Update(Author author);
        bool Delete(int id);
    }
}