using BetFriends.Bets.Application.Features.CreateBet;
using BetFriends.Bets.Application.UnitTests.Implems;
using BetFriends.Bets.Domain.Bets;
using BetFriends.Bets.Domain.Members;

namespace BetFriends.Bets.Application.UnitTests.Features;

public class NotifyBetCreatedHandlerTest
{
    [Fact]
    public async Task ShouldNotifyMembersForBet()
    {
        var betId = Guid.NewGuid();
        var memberId = Guid.NewGuid();
        var notification = new BetCreatedEventNotification(new(betId), default!, 300);
        var emailSender = new MockEmailSender();
        var betRepository = new MockBetRepository(Bet.Create(new(betId),
                                                             default!,
                                                             "description",
                                                             300,
                                                             new DateTime(2024, 10, 10),
                                                             [memberId],
                                                             new DateTime(2024, 9, 10)));
        var memberRepository = new StubMemberRepository(new Member(new(memberId), "username", 0, 3));
        var handler = new NotifyBetCreatedNotificationHandler([emailSender], betRepository, memberRepository);
        await handler.Handle(notification, default!);
        Assert.All(emailSender.Members, (x) => new List<Guid>([memberId]).Contains(x.MemberId.Value));
    }

    [Fact]
    public async Task ShouldNotNotifyWhenBetDoesNotExist()
    {
        var betId = Guid.NewGuid();
        var memberId = Guid.NewGuid();
        var notification = new BetCreatedEventNotification(new(betId), default!, 300);
        var emailSender = new MockEmailSender();
        var betRepository = new MockBetRepository();
        var memberRepository = new StubMemberRepository(new Member(new(memberId), "username", 0, 3));
        var handler = new NotifyBetCreatedNotificationHandler([emailSender], betRepository, memberRepository);
        await handler.Handle(notification, default!);
        Assert.Empty(emailSender.Members);
    }
}
