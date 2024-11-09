using BetFriends.Domain.Features.AnswerBet;
using CommunityToolkit.Mvvm.Messaging;

namespace BetFriends.Features.Bets.RetrieveBets;

internal class AnswerBetPresenter : IAnswerBetOutputPort
{
    public void CannotAnswerToOwnBet()
    {
        WeakReferenceMessenger.Default.Send(new AnswerBetError("Answer forbidden"));
    }

    public void InvalidAnswer()
    {
        WeakReferenceMessenger.Default.Send(new AnswerBetError("Invalid answer"));
    }

    public void InvalidEndDate()
    {
        WeakReferenceMessenger.Default.Send(new AnswerBetError("Invalid end date"));
    }

    public void Present(AnswerBetResponse answerBetResponse)
    {
        WeakReferenceMessenger.Default.Send(answerBetResponse);
    }
}

internal record AnswerBetError(string Message);