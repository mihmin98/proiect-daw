using Bookstore.Entities;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Bookstore.IRepositories
{
    public interface IUserRepository : IGenericRepository<User>
    {
        User GetUserByUsernameAndPassword(string username, string password);
    }
}