﻿using BetFriends.Bets.Domain.Bets;

namespace BetFriends.Bets.Application.UnitTests.Implems
{
    internal class MockBetRepository : IBetRepository
    {
        public MockBetRepository(Bet bet = null!)
        {
            Bet = bet;
        }
        internal Bet Bet { get; private set; }

        public Task<Bet> GetByIdAsync(BetId betId)
        {
            if (Bet?.BetId == betId)
                return Task.FromResult(Bet);
            return Task.FromResult<Bet>(null!);
        }

        public Task SaveAsync(Bet bet)
        {
            Bet = bet;
            return Task.CompletedTask;
        }
    }
}
