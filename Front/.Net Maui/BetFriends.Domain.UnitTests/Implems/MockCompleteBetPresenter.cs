using BetFriends.Domain.Features.CompleteBet;

namespace BetFriends.Domain.UnitTests.Implems;

internal class MockCompleteBetPresenter : ICompleteBetOutputPort
{
    internal string Message { get; private set; }

    public void ProofIsMissing(string betId)
    {
        Message = $"proof is missing for bet {betId}";
    }

    public void Success(string betId, bool isSuccess)
    {
        Message = $"bet {betId} completed";
    }
}
