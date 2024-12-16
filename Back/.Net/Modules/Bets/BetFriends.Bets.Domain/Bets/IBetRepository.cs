namespace BetFriends.Bets.Domain.Bets;

public interface IBetRepository
{
    Task<Bet> GetByIdAsync(BetId betId);
    Task SaveAsync(Bet bet);
}
