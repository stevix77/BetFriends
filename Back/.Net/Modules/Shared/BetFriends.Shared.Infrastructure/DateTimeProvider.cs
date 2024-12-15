using BetFriends.Shared.Application.Abstractions;

namespace BetFriends.Shared.Infrastructure;

public class DateTimeProvider : IDateProvider
{
    public DateTime GetDate() => DateTime.UtcNow;
}
