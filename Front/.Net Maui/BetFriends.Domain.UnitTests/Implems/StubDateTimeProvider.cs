using BetFriends.Domain.Abstractions;

namespace BetFriends.Domain.UnitTests.Implems;

internal class StubDateTimeProvider : IDateTimeProvider
{
    private DateTime dateTime;

    public StubDateTimeProvider(DateTime dateTime)
    {
        this.dateTime = dateTime;
    }

    public DateTime GetCurrentDate() => dateTime;
}
