using Bookstore.Entities;
using Bookstore.IRepositories;
using Bookstore.IServices;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Bookstore.Services
{
    public class AuthorService : IAuthorService
    {
        private readonly IAuthorRepository repository;

        public AuthorService(IAuthorRepository repository)
        {
            this.repository = repository;
        }

        public List<Author> GetAll()
        {
            return repository.GetAll();
        }

        public Author GetById(int id)
        {
            return repository.GetByIdJoined(id);
        }

        public bool Insert(Author author)
        {
            repository.Create(author);
            return repository.SaveChanges();
        }

        public bool Update(Author author)
        {
            repository.Update(author);
            return repository.SaveChanges();
        }

        public bool Delete(int id)
        {
            Author author = repository.FindById(id);
            repository.Delete(author);
            return repository.SaveChanges();
        }
    }
}