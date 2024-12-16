using BetFriends.Bets.Application.Features.CreateBet;

namespace BetFriends.Bets.Application.UnitTests.Implems;

internal class MockCreateBetPresenter : ICreateBetOutputPort
{
    public const string MemberDoesNotExistMessage = "member does not exist";
    public const string EndDateTooOldMessage = "end date too old";
    public const string NoneChip = "none chip";
    public const string NoneFriends = "none friends";

    public CreateBetResponse Response { get; private set; }
    public string ErrorMessage { get; private set; }

    public void CoinsMissing()
    {
        ErrorMessage = NoneChip;
    }

    public void EndDateIsTooOld()
    {
        ErrorMessage = EndDateTooOldMessage;
    }

    public void FriendsMissing()
    {
        ErrorMessage = NoneFriends;
    }

    public void MemberDoesNotExist(Guid userId)
    {
        ErrorMessage = MemberDoesNotExistMessage;
    }

    public void Present(CreateBetResponse createBetResponse)
    {
        Response = createBetResponse;
    }
}
