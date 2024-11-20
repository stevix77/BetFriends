using BetFriends.Domain.Features.CompleteBet;
using CommunityToolkit.Mvvm.Messaging;

namespace BetFriends.Blazor.Presenters;

internal class CompleteBetPresenter : ICompleteBetOutputPort
{
    public void ProofIsMissing(string betId)
    {
        WeakReferenceMessenger.Default.Send(new ProofMissingError(betId));
    }

    public void Success(string betId, bool isSuccess)
    {
        WeakReferenceMessenger.Default.Send(new BetCompleted(betId, isSuccess));
    }
}

internal record ProofMissingError
{
    public ProofMissingError(string betId)
    {
        Message = $"Proof is missing fo bet {betId}";
    }
    internal string Message { get; }
}

internal record BetCompleted(string BetId, bool IsSuccess);