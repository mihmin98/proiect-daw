using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Bookstore.Entities
{
    public class Author : BaseEntity
    {
        public String Name { get; set; }

        public virtual List<Book> Books { get; set; }
    }
}