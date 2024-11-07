using BetFriends.Domain.Abstractions;

namespace BetFriends.Blazor.Services;

internal class DateTimeProvider : IDateTimeProvider
{
    public DateTime GetCurrentDate() => DateTime.Now;
}
