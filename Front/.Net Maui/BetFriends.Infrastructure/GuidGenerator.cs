using BetFriends.Domain.Abstractions;

namespace BetFriends.Infrastructure;

public class GuidGenerator : IIdGenerator
{
    public string Generate() => Guid.NewGuid().ToString().Replace("-", "");
}
