using Bookstore.Entities;
using Bookstore.IRepositories;
using Bookstore.IServices;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Bookstore.Services
{
    public class BookService : IBookService
    {
        private readonly IBookRepository repository;

        public BookService(IBookRepository repository)
        {
            this.repository = repository;
        }

        public List<Book> GetAll()
        {
            return repository.GetAll();
        }

        public Book GetById(int id)
        {
            return repository.GetByIdJoined(id);
        }

        public bool Insert(Book book)
        {
            repository.Create(book);
            return repository.SaveChanges();
        }

        public bool Update(Book book)
        {
            repository.Update(book);
            return repository.SaveChanges();
        }

        public bool Delete(int id)
        {
            Book book = repository.FindById(id);
            repository.Delete(book);
            return repository.SaveChanges();
        }
    }
}