using BetFriends.Shared.Application.Abstractions;

namespace BetFriends.Application.UnitTests.Implems;

internal class StubDateProvider : IDateProvider
{
    private DateTime currentDate;

    public StubDateProvider(DateTime dateTime)
    {
        currentDate = dateTime;
    }

    public DateTime GetDate() => currentDate;
}
