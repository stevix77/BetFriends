using BetFriends.Application.Features.AnswerBet;

namespace BetFriends.Application.UnitTests.Implems;

internal class MockAnswerBetOutputPort : IAnswerBetOutputPort
{
    internal bool? IsSuccess { get; private set; }
    internal string? Message { get; private set; }

    public void BetDoesNotExist()
    {
        Message = "bet does not exist";
        IsSuccess = false;
    }

    public void Success()
    {
        IsSuccess = true;
    }
}
