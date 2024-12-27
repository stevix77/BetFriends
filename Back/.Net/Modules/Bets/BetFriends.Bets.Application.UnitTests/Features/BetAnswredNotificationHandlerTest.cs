using BetFriends.Bets.Application.Features.AnswerBet;
using BetFriends.Bets.Application.UnitTests.Implems;
using BetFriends.Bets.Domain.Bets;
using BetFriends.Bets.Domain.Members;
using BetFriends.Bets.Domain.Members.Services;

namespace BetFriends.Bets.Application.UnitTests.Features;

public class BetAnswredNotificationHandlerTest
{
    [Fact]
    public async Task ShouldDecreaseCoinsWhenMemberAcceptBet()
    {
        var memberId = Guid.NewGuid();
        var betId = Guid.NewGuid();
        var member = new Member(new MemberId(memberId), "username", 3000, 3);
        var repository = new StubMemberRepository(member);
        var betRepository = new MockBetRepository(Bet.Create(new(betId),
                                                            new(Guid.NewGuid()),
                                                            "",
                                                            500,
                                                            new DateTime(2024, 12, 14),
                                                            [memberId],
                                                            new DateTime(2024, 11, 14)));
        var command = new BetAnsweredNotification(new(betId), new(memberId), true);
        var handler = new BetAnsweredNotificationHandler(new DecreaseCoinsMember(repository), betRepository);
        await handler.Handle(command, default!);
        Assert.Equal(new MemberState(memberId, "username", 2500, 3), member.State);
    }

    [Fact]
    public async Task ShouldNotDecreaseWhenMemberRejectBet()
    {
        var memberId = Guid.NewGuid();
        var betId = Guid.NewGuid();
        var member = new Member(new MemberId(memberId), "username", 3000, 3);
        var repository = new StubMemberRepository(member);
        var betRepository = new MockBetRepository(Bet.Create(new(betId),
                                                            new(Guid.NewGuid()),
                                                            "",
                                                            500,
                                                            new DateTime(2024, 12, 14),
                                                            [memberId],
                                                            new DateTime(2024, 11, 14)));
        var command = new BetAnsweredNotification(new(betId), new(memberId), false);
        var handler = new BetAnsweredNotificationHandler(new DecreaseCoinsMember(repository), betRepository);
        await handler.Handle(command, default!);
        Assert.Equal(new MemberState(memberId, "username", 3000, 3), member.State);
    }

    [Fact]
    public async Task ShouldNotDecreaseWhenBetDoesNotExist()
    {
        var memberId = Guid.NewGuid();
        var betId = Guid.NewGuid();
        var member = new Member(new MemberId(memberId), "username", 3000, 3);
        var repository = new StubMemberRepository(member);
        var betRepository = new MockBetRepository();
        var command = new BetAnsweredNotification(new(betId), new(memberId), true);
        var handler = new BetAnsweredNotificationHandler(new DecreaseCoinsMember(repository), betRepository);
        await handler.Handle(command, default!);
        Assert.Equal(new MemberState(memberId, "username", 3000, 3), member.State);
    }
}
