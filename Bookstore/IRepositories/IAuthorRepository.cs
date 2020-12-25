using Bookstore.Entities;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Bookstore.IRepositories
{
    public interface IAuthorRepository : IGenericRepository<Author>
    {
        Author GetByIdJoined(int id);
    }
}