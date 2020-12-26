using Bookstore.IServices;
using Bookstore.Models;
using Microsoft.AspNetCore.Http;
using Microsoft.Extensions.Options;
using Microsoft.IdentityModel.Tokens;
using System;
using System.Collections.Generic;
using System.IdentityModel.Tokens.Jwt;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Bookstore.Helpers
{
    public class JwtMiddleware
    {
        private readonly RequestDelegate requestDelegate;
        private readonly AppSettings appSettings;

        public JwtMiddleware(RequestDelegate requestDelegate, IOptions<AppSettings> options)
        {
            this.requestDelegate = requestDelegate;
            this.appSettings = options.Value;
        }

        public async Task Invoke(HttpContext context, IUserService userService)
        {
            string token = context.Request.Headers["Authorization"].FirstOrDefault()?.Split(" ").Last();

            if (token != null)
                AttachUserToContextByToken(context, userService, token);

            await requestDelegate(context);
        }

        private void AttachUserToContextByToken(HttpContext context, IUserService userService, string token)
        {
            try
            {
                byte[] key = Encoding.ASCII.GetBytes(appSettings.Secret);
                var tokenHandler = new JwtSecurityTokenHandler();
                tokenHandler.ValidateToken(token, new Microsoft.IdentityModel.Tokens.TokenValidationParameters
                {
                    ValidateIssuerSigningKey = true,
                    IssuerSigningKey = new SymmetricSecurityKey(key),
                    ValidateIssuer = false,
                    ValidateAudience = false
                }, out SecurityToken securityToken);

                var jwtToken = (JwtSecurityToken)securityToken;
                int userId = int.Parse(jwtToken.Claims.FirstOrDefault(x => x.Type == "id").Value);

                context.Items["User"] = userService.GetById(userId);
            }
            catch (Exception e)
            {
                Console.WriteLine(e.StackTrace);
            }
        }
    }
}