namespace BetFriends.Domain.Features.CompleteBet;

public interface ICompleteBetOutputPort
{
    void ProofIsMissing(string betId);
    void Success(string betId, bool isSuccess);
}
