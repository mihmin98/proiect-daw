using Bookstore.Entities;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Bookstore.IRepositories
{
    public interface IClientRepository : IGenericRepository<Client>
    {
        Client GetByIdJoined(int id);
    }
}