using Bookstore.Entities;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Bookstore.Data
{
    public class BookstoreDbContext : DbContext
    {
        public BookstoreDbContext(DbContextOptions<BookstoreDbContext> options) : base(options)
        {
        }

        public DbSet<Author> Authors { get; set; }
        public DbSet<Book> Books { get; set; }
        public DbSet<Client> Clients { get; set; }
        public DbSet<Rental> Rentals { get; set; }
        public DbSet<BookRental> BookRentals { get; set; }
        public DbSet<Transaction> Transactions { get; set; }

        protected override void OnModelCreating(ModelBuilder builder)
        {
            builder.Entity<Author>()
                .HasMany(x => x.Books)
                .WithOne(x => x.Author)
                .HasForeignKey(x => x.AuthorId)
                .OnDelete(DeleteBehavior.NoAction);

            builder.Entity<Transaction>()
                .HasOne(x => x.Rental)
                .WithOne(x => x.Transaction)
                .OnDelete(DeleteBehavior.NoAction);


            builder.Entity<Client>()
                .HasMany(x => x.Rentals)
                .WithOne(x => x.Client)
                .HasForeignKey(x => x.ClientId)
                .OnDelete(DeleteBehavior.NoAction);

            builder.Entity<BookRental>().HasKey(x => new { x.BookId, x.RentalId });

            builder.Entity<BookRental>()
                .HasOne(x => x.Book)
                .WithMany(x => x.BookRentals)
                .HasForeignKey(x => x.BookId);

            builder.Entity<BookRental>()
                .HasOne(x => x.Rental)
                .WithMany(x => x.BookRentals)
                .HasForeignKey(x => x.RentalId);
        }
    }
}
