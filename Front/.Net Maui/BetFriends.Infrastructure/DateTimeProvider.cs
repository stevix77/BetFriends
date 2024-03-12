using BetFriends.Domain.Abstractions;

namespace BetFriends.Infrastructure;

internal class DateTimeProvider : IDateTimeProvider
{
    public DateTime GetCurrentDate() => DateTime.Now;
}
