using BetFriends.Bets.Application.Features.AddFriend;

namespace BetFriends.Bets.Application.UnitTests.Implems;

internal class StubAddFriendPresenter : IAddFriendOutputPort
{
    public StubAddFriendPresenter()
    {
    }

    public bool? FriendAdded { get; private set; }

    public void MemberDoesNotExist()
    {
        FriendAdded = false;
    }

    public void Present()
    {
        FriendAdded = true;
    }
}
