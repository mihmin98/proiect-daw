using Bookstore.Entities;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Bookstore.IServices
{
    public interface IClientService {
        List<Client> GetAll();
        Client GetById(int id);
        bool Insert(Client client);
        bool Update(Client client);
        bool Delete(int id);
    }
}