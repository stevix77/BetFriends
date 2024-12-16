using BetFriends.Bets.Application.Features.AddFriend;
using BetFriends.Bets.Application.UnitTests.Implems;
using BetFriends.Bets.Domain.Events;
using BetFriends.Bets.Domain.Members;

namespace BetFriends.Bets.Application.UnitTests.SUTs;

internal class AddFriendHandlerSut(Guid requesterId)
{
    private StubMemberRepository memberRepository = default!;
    private readonly StubFriendRepository friendRepository = new();
    private readonly StubAddFriendPresenter presenter = new();

    internal async Task<AddFriendHandlerSut> WhenExecuteHandle(Guid memberId)
    {
        var handler = new AddFriendCommandHandler(memberRepository, friendRepository, new StubUserContext(requesterId), presenter);
        await handler.Handle(new AddFriendRequest(memberId), default!);
        return this;
    }

    internal void ThenShouldCreateFriendship(Guid memberId)
    {
        Assert.Collection(friendRepository.Friends, friendship =>
        {
            Assert.Equal(memberId, friendship.FriendId);
            Assert.Equal(requesterId, friendship.RequesterId);
            Assert.Equal(new FriendshipRequested(requesterId, memberId), friendship.Events.First());
        });
        Assert.True(presenter.FriendAdded);
    }

    internal AddFriendHandlerSut WithMember(Member member)
    {
        memberRepository = new StubMemberRepository(member);
        return this;
    }

    internal void ThenShouldNotCreateFriendship(Guid memberId)
    {
        Assert.Empty(friendRepository.Friends);
        Assert.False(presenter.FriendAdded);
    }
}
