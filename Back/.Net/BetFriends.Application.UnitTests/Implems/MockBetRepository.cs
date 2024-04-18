using BetFriends.Domain.Bets;

namespace BetFriends.Application.UnitTests.Implems
{
    internal class MockBetRepository : IBetRepository
    {
        public Bet Bet { get; private set; }

        public Task SaveAsync(Bet bet)
        {
            this.Bet = bet;
            return Task.CompletedTask;
        }
    }
}
