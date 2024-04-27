using BetFriends.Application.Features.CreateBet;
using BetFriends.Application.UnitTests.Implems;
using BetFriends.Domain.Bets;
using BetFriends.Domain.Members;

namespace BetFriends.Application.UnitTests.Features;

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
                                                             [memberId]));
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

public class MockEmailSender : INotifier
{
    public List<Member> Members { get; } = new List<Member>();

    public Task Notify(IEnumerable<Member> guests)
    {
        Members.AddRange(guests);
        return Task.CompletedTask;
    }
}
