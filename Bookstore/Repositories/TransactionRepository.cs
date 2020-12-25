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
    public class TransactionRepository : GenericRepository<Transaction>, ITransactionRepository
    {
        public TransactionRepository(BookstoreDbContext context) : base(context)
        {
        }

        public Transaction GetByIdJoined(int id)
        {
            Transaction transaction = context.Transactions.Where(x => x.Id == id)
                .Include(x => x.Rental)
                .FirstOrDefault();
            
            return transaction;
        }
    }
}