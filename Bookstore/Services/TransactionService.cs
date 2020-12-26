using Bookstore.Entities;
using Bookstore.IRepositories;
using Bookstore.IServices;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Bookstore.Services
{
    public class TransactionService : ITransactionService
    {
        private readonly ITransactionRepository repository;

        public TransactionService(ITransactionRepository repository)
        {
            this.repository = repository;
        }

        public List<Transaction> GetAll()
        {
            return repository.GetAll();
        }

        public Transaction GetById(int id)
        {
            return repository.GetByIdJoined(id);
        }

        public bool Insert(Transaction transaction)
        {
            repository.Create(transaction);
            return repository.SaveChanges();
        }

        public bool Update(Transaction transaction)
        {
            repository.Update(transaction);
            return repository.SaveChanges();
        }

        public bool Delete(int id)
        {
            Transaction transaction = repository.FindById(id);
            repository.Delete(transaction);
            return repository.SaveChanges();
        }
    }
}