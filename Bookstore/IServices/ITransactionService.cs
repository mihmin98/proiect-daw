using Bookstore.Entities;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Bookstore.IServices
{
    public interface ITransactionService {
        List<Transaction> GetAll();
        Transaction GetById(int id);
        bool Insert(Transaction transaction);
        bool Update(Transaction transaction);
        bool Delete(int id);
    }
}