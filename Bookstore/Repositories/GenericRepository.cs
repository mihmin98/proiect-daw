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
    public class GenericRepository<T> : IGenericRepository<T> where T : BaseEntity
    {
        protected readonly BookstoreDbContext context;
        protected readonly DbSet<T> table;

        public GenericRepository(BookstoreDbContext context)
        {
            this.context = context;
            table = context.Set<T>();
        }

        public void Create(T entity)
        {
            entity.CreatedTime = DateTime.UtcNow;
            entity.UpdatedTime = DateTime.UtcNow;
            context.Set<T>().Add(entity);
        }

        public void CreateRange(List<T> entities)
        {
            entities.ForEach(x =>
            {
                x.CreatedTime = DateTime.UtcNow;
                x.UpdatedTime = DateTime.UtcNow;
            });

            table.AddRange(entities);
        }

        public void Delete(T entity)
        {
            table.Remove(entity);
        }

        public T FindById(int id)
        {
            return table.Find(id);
        }

        public List<T> GetAll()
        {
            return table.ToList();
        }

        public bool SaveChanges()
        {
            return context.SaveChanges() > 0;
        }

        public void Update(T entity)
        {
            entity.UpdatedTime = DateTime.UtcNow;
            table.Update(entity);
        }
    }
}