
namespace BetFriends.Domain.Bets;

public interface IBetRepository
{
    Task SaveAsync(Bet bet);
}
