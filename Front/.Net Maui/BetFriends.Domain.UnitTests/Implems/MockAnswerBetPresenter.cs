using BetFriends.Domain.Features.AnswerBet;

namespace BetFriends.Domain.UnitTests.Implems;

internal class MockAnswerBetPresenter : IAnswerBetOutputPort
{
    public string? Error { get; private set; }
    internal AnswerBetResponse AnswerResponse { get; private set; } = default!;

    public void CannotAnswerToOwnBet()
    {
        Error = "Cannot answer to own bet";
    }

    public void InvalidAnswer()
    {
        Error = "Invalid answer";
    }

    public void InvalidEndDate()
    {
        Error = "Invalid EndDate";
    }

    public void Present(AnswerBetResponse answerBetResponse)
    {
        AnswerResponse = answerBetResponse;
    }
}
