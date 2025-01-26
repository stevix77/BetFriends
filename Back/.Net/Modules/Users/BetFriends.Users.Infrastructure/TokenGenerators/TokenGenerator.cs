using BetFriends.Shared.Application.Abstractions;
using BetFriends.Users.Domain;
using System.Text;

namespace BetFriends.Users.Infrastructure.TokenGenerators;

internal class TokenGenerator(IDateProvider dateProvider) : ITokenGenerator
{
    public string Generate(Guid userId)
    {
        var data = string.Join('-',
                               Guid.NewGuid(),
                               userId,
                               dateProvider.GetDate().ToString("yyyyMMddHHmmss"));
        return Convert.ToBase64String(Encoding.Default.GetBytes(data));

    }
}
