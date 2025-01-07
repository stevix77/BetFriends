using BetFriends.Shared.Application.Abstractions;
using BetFriends.Users.Domain.Users;
using BetFriends.Users.Infrastructure.Configurations;
using Microsoft.IdentityModel.Tokens;
using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Text;

namespace BetFriends.Users.Infrastructure.TokenGenerators;

internal class JwtTokenGenerator(JwtConfiguration jwtConfiguration, IDateProvider dateProvider)
{
    internal string GenerateToken(UserSnapshot user)
    {
        var mySecurityKey = new SymmetricSecurityKey(Encoding.ASCII.GetBytes(jwtConfiguration.Key));
        var tokenHandler = new JwtSecurityTokenHandler();
        var tokenDescriptor = new SecurityTokenDescriptor
        {
            Subject = new ClaimsIdentity(new Claim[]
            {
                    new Claim(ClaimTypes.Email, user.Email),
                    new Claim(ClaimTypes.Name, user.Username),
                    new Claim(ClaimTypes.NameIdentifier, user.Id.ToString()),
            }),
            Expires = dateProvider.GetDate().AddDays(1),
            Issuer = jwtConfiguration.Issuer,
            IssuedAt = dateProvider.GetDate(),
            Audience = jwtConfiguration.Audience,
            SigningCredentials = new SigningCredentials(mySecurityKey, SecurityAlgorithms.HmacSha256Signature)
        };
        var token = tokenHandler.CreateToken(tokenDescriptor);
        return tokenHandler.WriteToken(token);
    }
}
