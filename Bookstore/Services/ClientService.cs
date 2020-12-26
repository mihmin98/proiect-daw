using Bookstore.Entities;
using Bookstore.IRepositories;
using Bookstore.IServices;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Bookstore.Services
{
    public class ClientService : IClientService
    {
        private readonly IClientRepository repository;

        public ClientService(IClientRepository repository)
        {
            this.repository = repository;
        }

        public List<Client> GetAll()
        {
            return repository.GetAll();
        }

        public Client GetById(int id)
        {
            return repository.GetByIdJoined(id);
        }

        public bool Insert(Client client)
        {
            repository.Create(client);
            return repository.SaveChanges();
        }

        public bool Update(Client client)
        {
            repository.Update(client);
            return repository.SaveChanges();
        }

        public bool Delete(int id)
        {
            Client client = repository.FindById(id);
            repository.Delete(client);
            return repository.SaveChanges();
        }
    }
}