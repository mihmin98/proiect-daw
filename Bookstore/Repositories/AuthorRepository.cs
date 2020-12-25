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
    public class AuthorRepository : GenericRepository<Author>, IAuthorRepository
    {
        public AuthorRepository(BookstoreDbContext context) : base(context)
        {
        }

        public Author GetByIdJoined(int id)
        {
            Author author = context.Authors.Where(x => x.Id == id)
                .Include(x => x.Books)
                .FirstOrDefault();
            
            return author;
        }
    }
}