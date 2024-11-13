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

    public void MemberDoesNotExist()
    {
        Message = "member does not exist";
        IsSuccess = false;
    }

    public void MemberHasNotEnoughCoins()
    {
        Message = "member has not enough coins";
        IsSuccess = false;
    }

    public void MemberIsNotAuthorized()
    {
        Message = "member is not authorized";
        IsSuccess = false;
    }

    public void Success()
    {
        IsSuccess = true;
    }

    public void TimeToAnswerIsOver()
    {
        Message = "time to answer is over";
        IsSuccess = false;
    }
}
