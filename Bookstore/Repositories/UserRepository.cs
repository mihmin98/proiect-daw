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
    public class UserRepository : GenericRepository<User>, IUserRepository
    {
        public UserRepository(BookstoreDbContext context) : base(context)
        {
        }

        public User GetUserByUsernameAndPassword(string username, string password)
        {
            return table.Where(x => x.Username == username && x.Password == password).FirstOrDefault();
        }

    }
}