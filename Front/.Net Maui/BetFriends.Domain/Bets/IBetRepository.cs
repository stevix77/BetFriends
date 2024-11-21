﻿using BetFriends.Domain.Features.CreateBet;
using BetFriends.Domain.Features.RetrieveBets;

namespace BetFriends.Domain.Bets;

public interface IBetRepository
{
    Task AnswerBetAsync(string betId, bool answer);
    Task<IEnumerable<RetrieveBetsItemResponse>> RetrieveBetsAsync();
    Task<byte[]> RetrieveProofAsync(string betId);
    Task SaveAsync(Bet bet, CancellationToken cancellationToken);
}
