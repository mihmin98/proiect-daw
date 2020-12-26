using Bookstore.Entities;
using Bookstore.IRepositories;
using Bookstore.IServices;
using Bookstore.Models;
using Microsoft.Extensions.Options;
using Microsoft.IdentityModel.Tokens;
using System;
using System.Collections.Generic;
using System.IdentityModel.Tokens.Jwt;
using System.Linq;
using System.Security.Claims;
using System.Text;
using System.Threading.Tasks;
using System.Security.Cryptography;
using Microsoft.AspNetCore.Cryptography.KeyDerivation;


namespace Bookstore.Services
{
    public class UserService : IUserService
    {
        private readonly IUserRepository repository;
        private readonly AppSettings appSettings;

        public UserService(IUserRepository repository, AppSettings appSettings)
        {
            this.repository = repository;
            this.appSettings = appSettings;
        }

        public User GetById(int id)
        {
            return repository.FindById(id);
        }

        public List<User> GetAll()
        {
            return repository.GetAll();
        }

        public bool Register(AuthenticationRequest request)
        {
            User entity = new User
            {
                Username = request.Username,
                Password = HashPassword(request.Password)
            };

            repository.Create(entity);
            return repository.SaveChanges();
        }

        public AuthenticationResponse Login(AuthenticationRequest request)
        {
            User user = repository.GetUserByUsernameAndPassword(request.Username, HashPassword(request.Password));

            if (user == null)
                return null;

            string token = GenerateJwtForUser(user);

            return new AuthenticationResponse
            {
                Id = user.Id,
                Username = user.Username,
                Token = token
            };
        }

        private string HashPassword(string password)
        {
            byte[] salt = new byte[128 / 8];
            using (var rng = RandomNumberGenerator.Create())
            {
                rng.GetBytes(salt);
            }

            return Convert.ToBase64String(KeyDerivation.Pbkdf2(
                password: password,
                salt: salt,
                prf: KeyDerivationPrf.HMACSHA1,
                iterationCount: 10000,
                numBytesRequested: 256 / 8));
        }

        private string GenerateJwtForUser(User user)
        {
            var key = Encoding.ASCII.GetBytes(appSettings.Secret);
            var tokenHandler = new JwtSecurityTokenHandler();
            var tokenDescriptor = new SecurityTokenDescriptor()
            {
                Subject = new System.Security.Claims.ClaimsIdentity(new[] { new Claim("id", user.Id.ToString()) }),
                Expires = DateTime.UtcNow.AddDays(2),
                SigningCredentials = new SigningCredentials(new SymmetricSecurityKey(key), SecurityAlgorithms.HmacSha256Signature)
            };
            var token = tokenHandler.CreateToken(tokenDescriptor);
            return tokenHandler.WriteToken(token);
        }
    }
}