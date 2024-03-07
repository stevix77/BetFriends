using BetFriend.Domain.Features.AddFriend;

namespace BetFriend.Domain.UnitTests.Implems;

internal class StubAddFriendPresenter : IAddFriendOutputPort
{
    public bool Added { get; private set; }

    public void Present(string id)
    {
        Added = true;
    }
}
