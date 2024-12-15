using BetFriends.Shared.Application.Abstractions;

namespace BetFriends.Shared.Infrastructure;

public class GuidGenerator : IIdGenerator
{
    public Guid Generate() => Guid.NewGuid();
}
