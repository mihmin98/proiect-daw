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
    public class ClientRepository : GenericRepository<Client>, IClientRepository
    {
        public ClientRepository(BookstoreDbContext context) : base(context)
        {
        }

        public Client GetByIdJoined(int id)
        {
            Client client = context.Clients.Where(x => x.Id == id)
                .Include(x => x.Rentals)
                .FirstOrDefault();

            return client;
        }
    }
}