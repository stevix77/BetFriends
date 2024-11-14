using BetFriends.Application.Features.AnswerBet;
using BetFriends.Application.Features.CreateBet;
using BetFriends.Application.UnitTests.Implems;
using BetFriends.Domain.Bets;
using BetFriends.Domain.Members;
using BetFriends.Domain.Members.Exceptions;
using BetFriends.Domain.Members.Services;

namespace BetFriends.Application.UnitTests.Features;

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
        Assert.Equal(2500, member.Coins);
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
        Assert.Equal(3000, member.Coins);
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
        Assert.Equal(3000, member.Coins);
    }
}
