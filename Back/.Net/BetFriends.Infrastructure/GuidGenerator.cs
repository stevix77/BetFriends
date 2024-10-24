using BetFriends.Application.Abstractions;

namespace BetFriends.Infrastructure;

internal class GuidGenerator : IIdGenerator
{
    public Guid Generate() => Guid.NewGuid();
}
