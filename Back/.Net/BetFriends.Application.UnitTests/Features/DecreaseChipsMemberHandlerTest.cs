using BetFriends.Application.Features.CreateBet;
using BetFriends.Application.UnitTests.Implems;
using BetFriends.Domain.Members;
using BetFriends.Domain.Members.Exceptions;
using MediatR;

namespace BetFriends.Application.UnitTests.Features;

public class DecreaseChipsMemberHandlerTest
{
    [Fact]
    public async Task ShouldDecreaseChipsWhenMemberBet()
    {
        var memberId = Guid.NewGuid();
        var member = new Member(new MemberId(memberId), "username", 3000, 3);
        var repository = new StubMemberRepository(member);
        var command = new BetCreatedNotification(default!, new(memberId), 300);
        var handler = new DecreaseChipsNotificationHandler(repository);
        await handler.Handle(command, default!);
        Assert.Equal(2700, member.Chips);
    }

    [Fact]
    public async Task ShouldNotDecreaseWhenMemberDoesNotExist()
    {
        var memberId = Guid.NewGuid();
        var member = new Member(new MemberId(Guid.NewGuid()), "username", 3000, 3);
        var repository = new StubMemberRepository(member);
        var command = new BetCreatedNotification(default!, new(memberId), 300);
        var handler = new DecreaseChipsNotificationHandler(repository);
        var record = await Record.ExceptionAsync(() => handler.Handle(command, default!));
        Assert.IsType<MemberDoesNotExistException>(record);
    }
}