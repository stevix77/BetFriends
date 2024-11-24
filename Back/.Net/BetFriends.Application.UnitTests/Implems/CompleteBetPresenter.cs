using BetFriends.Application.Features.CompleteBet;

namespace BetFriends.Application.UnitTests.Implems;

internal class CompleteBetPresenter : ICompleteBetOutputPort
{
    public string ErrorMessage { get; private set; } = null!;
    internal CompleteBetResponse Response { get; private set; }

    public void BetDoesNotExist(Guid betId)
    {
        ErrorMessage = $"bet {betId} does not exist";
    }

    public void Success(CompleteBetResponse completeBetResponse)
    {
        Response = completeBetResponse;
    }
}
