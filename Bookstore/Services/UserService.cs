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

        public UserService(IUserRepository repository, IOptions<AppSettings> appSettings)
        {
            this.repository = repository;
            this.appSettings = appSettings.Value;
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
            byte[] salt = CreateSalt();
            string saltString = Convert.ToBase64String(salt);
            User entity = new User
            {
                Username = request.Username,
                Password = HashPassword(request.Password, salt),
                PasswordSalt = saltString
            };

            repository.Create(entity);
            return repository.SaveChanges();
        }

        public AuthenticationResponse Login(AuthenticationRequest request)
        {
            string saltString = repository.GetSaltByUser(request.Username);
            if (saltString == null)
                return null;

            byte[] salt = Convert.FromBase64String(saltString);
            User user = repository.GetUserByUsernameAndPassword(request.Username, HashPassword(request.Password, salt));
            
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

        private byte[] CreateSalt()
        {
            byte[] salt = new byte[128 / 8];
            using (var rng = RandomNumberGenerator.Create())
            {
                rng.GetBytes(salt);
            }

            return salt;
        }

        private string HashPassword(string password, byte[] salt)
        {
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