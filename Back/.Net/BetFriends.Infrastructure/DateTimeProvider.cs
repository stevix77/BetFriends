using BetFriends.Application.Abstractions;

namespace BetFriends.Infrastructure;

internal class DateTimeProvider : IDateProvider
{
    public DateTime GetDate() => DateTime.UtcNow;
}
