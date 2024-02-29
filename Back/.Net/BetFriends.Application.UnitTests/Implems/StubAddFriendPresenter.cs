using BetFriends.Application.Features.AddFriend;

namespace BetFriends.Application.UnitTests.Implems;

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
