using BetFriends.Application.Features.AddFriend;
using BetFriends.Application.UnitTests.Implems;
using BetFriends.Domain.Members;

namespace BetFriends.Application.UnitTests.Features;

public class AddFriendHandlerTest
{
    [Fact]
    public async Task ShouldAddFriendWhenMemberKnown()
    {
        var memberId = Guid.NewGuid();
        var requesterId = Guid.NewGuid();
        var member = new Member(new(memberId));
        var memberRepository = new StubMemberRepository(member);
        var friendRepository = new StubFriendRepository();
        var presenter = new StubAddFriendPresenter();
        var handler = new AddFriendCommandHandler(memberRepository, friendRepository, new StubUserContext(requesterId), presenter);
        await handler.Handle(new AddFriendRequest(memberId), default!);
        Assert.Collection(friendRepository.Friends, friendship =>
        {
            Assert.Equal(memberId, friendship.FriendId);
            Assert.Equal(requesterId, friendship.RequesterId);
        });
        Assert.True(presenter.FriendAdded);
    }

    [Fact]
    public async Task ShouldNotAddFriendWhenMemberDoesNotExist()
    {
        var memberId = Guid.NewGuid();
        var memberRepository = new StubMemberRepository(default!);
        var friendRepository = new StubFriendRepository();
        var presenter = new StubAddFriendPresenter();
        var handler = new AddFriendCommandHandler(memberRepository, friendRepository, new StubUserContext(Guid.NewGuid()), presenter);
        await handler.Handle(new AddFriendRequest(memberId), default!);
        Assert.Empty(friendRepository.Friends);
        Assert.False(presenter.FriendAdded);
    }
}