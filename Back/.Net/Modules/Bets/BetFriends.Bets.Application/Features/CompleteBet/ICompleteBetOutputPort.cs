namespace BetFriends.Bets.Application.Features.CompleteBet;

public interface ICompleteBetOutputPort
{
    void BetDoesNotExist(Guid betId);
    void Success(CompleteBetResponse completeBetResponse);
}
