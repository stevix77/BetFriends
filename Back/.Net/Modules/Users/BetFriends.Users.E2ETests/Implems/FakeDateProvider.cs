using BetFriends.Shared.Application.Abstractions;

namespace BetFriends.Users.E2ETests.Implems;

internal class FakeDateProvider(DateTime date) : IDateProvider
{
    public DateTime GetDate()
        => date;
}
