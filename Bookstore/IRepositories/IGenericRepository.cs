using Bookstore.Entities;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Bookstore.IRepositories
{
    public interface IGenericRepository<T> where T : BaseEntity
    {
        List<T> GetAll();
        void Create(T entity);
        void Update(T entity);
        void Delete(T entity);
        void CreateRange(List<T> entities);

        T FindById(int id);

        bool SaveChanges();
    }
}