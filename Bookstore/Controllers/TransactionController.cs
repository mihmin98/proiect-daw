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
    public class TransactionController : ControllerBase
    {
        private readonly ITransactionService service;

        public TransactionController(ITransactionService service)
        {
            this.service = service;
        }

        [HttpGet("")]
        [Authorize]
        public IActionResult GetAll()
        {
            return Ok(service.GetAll());
        }

        [HttpGet("/{id}")]
        [Authorize]
        public IActionResult Get(int id)
        {
            return Ok(service.GetById(id));
        }

        [HttpPost("")]
        [Authorize]
        public IActionResult Create(Transaction payload)
        {
            return Ok(service.Insert(payload));
        }

        [HttpPut("")]
        [Authorize]
        public IActionResult Update(Transaction payload)
        {
            return Ok(service.Update(payload));
        }

        [HttpDelete("{id}")]
        [Authorize]
        public IActionResult Delete(int id)
        {
            return Ok(service.Delete(id));
        }
    }
}