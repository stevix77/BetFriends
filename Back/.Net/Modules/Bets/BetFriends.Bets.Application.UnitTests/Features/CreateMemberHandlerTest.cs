using BetFriends.Bets.Application.Features.UserRegistered;
using BetFriends.Bets.Application.UnitTests.Implems;
using BetFriends.Bets.Domain.Members;
using BetFriends.Bets.Domain.Members.Exceptions;

namespace BetFriends.Bets.Application.UnitTests.Features;

public class CreateMemberHandlerTest
{
    [Fact]
    public async Task ShouldCreateMember()
    {
        var memberId = Guid.NewGuid();
        var notification = new UserRegisteredNotification(memberId, "username", "email");
        var memberRepository = new MockMemberRepository();
        var handler = new CreateMemberNotificationHandler(memberRepository);
        await handler.Handle(notification, CancellationToken.None);
        Assert.Equal(new MemberState(memberId, "username", 2000, 0), memberRepository.Member.State);
    }

    [Fact]
    public async Task ShouldNotCreateMemberWhenMemberAlreadyExist()
    {
        var memberId = Guid.NewGuid();
        var notification = new UserRegisteredNotification(memberId, "username", "email");
        var member = Member.FromState(new MemberState(memberId, "username", 0, 0));
        var memberRepository = new MockMemberRepository(member);
        var handler = new CreateMemberNotificationHandler(memberRepository);
        var exception = await Record.ExceptionAsync(() => handler.Handle(notification, CancellationToken.None));
        Assert.IsType<MemberAlreadyExistException>(exception);
    }
}