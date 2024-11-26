using BetFriends.Application.Features.CompleteBet;
using BetFriends.Application.UnitTests.Builders;
using BetFriends.Application.UnitTests.Implems;
using BetFriends.Domain.AnswerBets;
using BetFriends.Domain.Members;

namespace BetFriends.Application.UnitTests.Features;

public class UpdateBalanceHandlerTest
{
    [Fact]
    public async Task ShouldUpdateBalanceBookieWhenBetIsSuccessful()
    {
        var betId = new Domain.Bets.BetId(Guid.NewGuid());
        var memberId = new MemberId(Guid.NewGuid());
        var notification = new BetCompletedNotification(betId, true);
        var betRepository = new MockBetRepository(new BetBuilder()
                                                    .WithId(betId)
                                                    .WithBookie(memberId)
                                                    .WithCoins(100)
                                                    .Build());
        var memberRepository = new StubMemberRepository(new Member(memberId, "username", 1000, 5));
        var answersRepository = new StubAnswerBetRepository([
            new AnswerBet(betId, true, default!),
            new AnswerBet(betId, true, default!)
            ]);
        var handler = new UpdateBalanceNotificationHandler(betRepository, memberRepository, answersRepository);
        await handler.Handle(notification, default!);
        Assert.Equal(1200, memberRepository.Member.Coins);
    }

    [Fact]
    public async Task ShouldNotUpdateBalanceBookieWhenBetIsUnknown()
    {
        var betId = new Domain.Bets.BetId(Guid.NewGuid());
        var memberId = new MemberId(Guid.NewGuid());
        var notification = new BetCompletedNotification(betId, true);
        var betRepository = new MockBetRepository();
        var memberRepository = new StubMemberRepository(new Member(memberId, "username", 1000, 5));
        var answersRepository = new StubAnswerBetRepository([]);
        var handler = new UpdateBalanceNotificationHandler(betRepository, memberRepository, answersRepository);
        await handler.Handle(notification, default!);
        Assert.Equal(1000, memberRepository.Member.Coins);
    }

    [Fact]
    public async Task ShouldUpdateBalanceGamblersWhenBetIsUnSuccessful()
    {
        var betId = new Domain.Bets.BetId(Guid.NewGuid());
        var memberId = new MemberId(Guid.NewGuid());
        var notification = new BetCompletedNotification(betId, false);
        var betRepository = new MockBetRepository(new BetBuilder()
                                                    .WithId(betId)
                                                    .WithBookie(new MemberId(Guid.NewGuid()))
                                                    .WithCoins(100)
                                                    .Build());
        var memberRepository = new StubMemberRepository(new Member(memberId, "username", 1000, 5));
        var answersRepository = new StubAnswerBetRepository([
                new AnswerBet(betId, true, memberId)
            ]);
        var handler = new UpdateBalanceNotificationHandler(betRepository, memberRepository, answersRepository);
        await handler.Handle(notification, default!);
        Assert.Equal(1100, memberRepository.Member.Coins);
    }
}
