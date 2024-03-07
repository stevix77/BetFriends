using BetFriend.Domain.Features.AddFriend;
using CommunityToolkit.Mvvm.Messaging;

namespace BetFriends.Features.Friends;

internal class AddFriendPresenter : IAddFriendOutputPort
{
    public void Present(string id)
    {
        WeakReferenceMessenger.Default.Send(new FriendAdded(id));
    }
}

internal record FriendAdded(string Id);