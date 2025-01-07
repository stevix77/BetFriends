using BetFriends.Bets.Application.Features.CompleteBet;
using BetFriends.Bets.Application.UnitTests.Builders;
using BetFriends.Bets.Application.UnitTests.Implems;
using BetFriends.Bets.Domain.AnswerBets;
using BetFriends.Bets.Domain.Members;

namespace BetFriends.Bets.Application.UnitTests.Features;

public class UpdateBalanceHandlerTest
{
    [Fact]
    public async Task ShouldUpdateBalanceBookieWhenBetIsSuccessful()
    {
        var betId = Guid.NewGuid();
        var memberId = Guid.NewGuid();
        var notification = new BetCompletedNotification(new Domain.Bets.BetId(betId), true);
        var betRepository = new MockBetRepository(new BetBuilder()
                                                    .WithId(betId)
                                                    .WithBookie(memberId)
                                                    .WithCoins(100)
                                                    .Build());
        var memberRepository = new StubMemberRepository(Member.FromState(new MemberState(memberId, "username", 1000, 5)));
        var answersRepository = new StubAnswerBetRepository([
            new AnswerBet(new(betId), true, default!),
            new AnswerBet(new(betId), true, default!)
            ]);
        var handler = new UpdateBalanceNotificationHandler(betRepository, memberRepository, answersRepository);
        await handler.Handle(notification, default!);
        Assert.Equal(new MemberState(memberId, "username", 1200, 5), memberRepository.Member.Snapshot);
    }

    [Fact]
    public async Task ShouldNotUpdateBalanceBookieWhenBetIsUnknown()
    {
        var betId = new Domain.Bets.BetId(Guid.NewGuid());
        var memberId = Guid.NewGuid();
        var notification = new BetCompletedNotification(betId, true);
        var betRepository = new MockBetRepository();
        var memberRepository = new StubMemberRepository(Member.FromState(new MemberState(memberId, "username", 1000, 5)));
        var answersRepository = new StubAnswerBetRepository([]);
        var handler = new UpdateBalanceNotificationHandler(betRepository, memberRepository, answersRepository);
        await handler.Handle(notification, default!);
        Assert.Equal(new MemberState(memberId, "username", 1000, 5), memberRepository.Member.Snapshot);
    }

    [Fact]
    public async Task ShouldUpdateBalanceGamblersWhenBetIsUnSuccessful()
    {
        var betId = new Domain.Bets.BetId(Guid.NewGuid());
        var memberId = Guid.NewGuid();
        var notification = new BetCompletedNotification(betId, false);
        var betRepository = new MockBetRepository(new BetBuilder()
                                                    .WithId(betId.Value)
                                                    .WithBookie(new MemberId(Guid.NewGuid()).Value)
                                                    .WithCoins(100)
                                                    .Build());
        var memberRepository = new StubMemberRepository(Member.FromState(new MemberState(memberId, "username", 1000, 5)));
        var answersRepository = new StubAnswerBetRepository([
                new AnswerBet(betId, true, new(memberId))
            ]);
        var handler = new UpdateBalanceNotificationHandler(betRepository, memberRepository, answersRepository);
        await handler.Handle(notification, default!);
        Assert.Equal(new MemberState(memberId, "username", 1100, 5), memberRepository.Member.Snapshot);
    }
}
