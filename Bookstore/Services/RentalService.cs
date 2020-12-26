using Bookstore.Entities;
using Bookstore.IRepositories;
using Bookstore.IServices;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Bookstore.Services
{
    public class RentalService : IRentalService
    {
        private readonly IRentalRepository rentalRepository;
        private readonly IBookRentalRepository bookRentalRepository;

        public RentalService(IRentalRepository rentalRepository, IBookRentalRepository bookRentalRepository)
        {
            this.rentalRepository = rentalRepository;
            this.bookRentalRepository = bookRentalRepository;
        }

        public List<Rental> GetAll()
        {
            return rentalRepository.GetAll();
        }

        public Rental GetById(int id)
        {
            return rentalRepository.GetByIdJoined(id);
        }

        public bool Insert(Rental rental)
        {
            rentalRepository.Create(rental);
            return rentalRepository.SaveChanges();
        }

        public bool Update(Rental rental)
        {
            rentalRepository.Update(rental);
            return rentalRepository.SaveChanges();
        }

        public bool Delete(int id)
        {
            Rental rental = rentalRepository.FindById(id);
            rentalRepository.Delete(rental);
            return rentalRepository.SaveChanges();
        }

        public bool AddBook(BookRental payload)
        {
            BookRental entity = new BookRental
            {
                BookId = payload.BookId,
                RentalId = payload.RentalId
            };

            bookRentalRepository.Create(entity);
            return bookRentalRepository.SaveChanges();
        }

        public bool RemoveBook(BookRental payload)
        {
            BookRental entity = bookRentalRepository.GetByBookAndRental(payload.BookId, payload.RentalId);
            bookRentalRepository.Delete(entity);
            return bookRentalRepository.SaveChanges();
        }
    }
}