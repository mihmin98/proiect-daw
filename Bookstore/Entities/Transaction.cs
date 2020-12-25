using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Bookstore.Entities
{
    public class Transaction : BaseEntity
    {
        public String BankAccount { get; set; }
        public float Amount { get; set; }

        public virtual Rental Rental { get; set; }
    }
}