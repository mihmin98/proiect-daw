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
using Microsoft.Extensions.Logging;

namespace Bookstore.Controllers
{
    [ApiController]
    [Route("[controller]")]
    public class AuthenticationController : ControllerBase
    {
        private readonly IUserService service;

        public AuthenticationController(IUserService service)
        {
            this.service = service;
        }

        [HttpPost("register")]
        public IActionResult Register(AuthenticationRequest request)
        {
            return Ok(service.Register(request));
        }

        [HttpPost("login")]
        public IActionResult Login(AuthenticationRequest request)
        {
            return Ok(service.Login(request));
        }

        [HttpGet("isAuth")]
        [Authorize]
        public IActionResult IsAuth()
        {
            return Ok(true);
        }
    }
}