using Bookstore.Entities;
using Bookstore.IServices;
using Bookstore.Helpers;
using Bookstore.Models;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Bookstore.Controllers
{
    [ApiController]
    [Route("[controller]")]
    public class RentalController : ControllerBase
    {
        private readonly IRentalService service;

        public RentalController(IRentalService service)
        {
            this.service = service;
        }

        [HttpGet]
        [Authorize]
        public IActionResult GetAll()
        {
            return Ok(service.GetAll());
        }

        [HttpGet("{id}")]
        [Authorize]
        public IActionResult Get(int id)
        {
            return Ok(service.GetById(id));
        }

        [HttpPost]
        [Authorize]
        public IActionResult Create(Rental payload)
        {
            return Ok(service.Insert(payload));
        }

        [HttpPost("returnId")]
        [Authorize]
        public IActionResult CreateAndReturnId(Rental payload)
        {
            return Ok(service.InsertAndReturnId(payload));
        }

        [HttpPut]
        [Authorize]
        public IActionResult Update(Rental payload)
        {
            return Ok(service.Update(payload));
        }

        [HttpDelete("{id}")]
        [Authorize]
        public IActionResult Delete(int id)
        {
            return Ok(service.Delete(id));
        }

        [HttpPost("addBook")]
        [Authorize]
        public IActionResult AddBook(BookRental payload)
        {
            return Ok(service.AddBook(payload));
        }
    }
}