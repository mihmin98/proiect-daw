using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Bookstore.Entities
{
    public class User : BaseEntity
    {
        public String Username { get; set; }
        public String Password { get; set; }
    }
}