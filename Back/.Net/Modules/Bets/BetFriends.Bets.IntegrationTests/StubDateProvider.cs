using BetFriends.Shared.Application.Abstractions;

namespace BetFriends.Bets.IntegrationTests;

internal class StubDateProvider(DateTime date) : IDateProvider
{
    public DateTime GetDate()
        => date;
}
