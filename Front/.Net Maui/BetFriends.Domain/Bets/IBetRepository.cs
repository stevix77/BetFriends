using BetFriends.Domain.Features.CreateBet;

namespace BetFriends.Domain.Bets;

public interface IBetRepository
{
    Task SaveAsync(Bet bet, CancellationToken cancellationToken);
}
