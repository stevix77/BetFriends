using BetFriends.Bets.Domain.Bets;
using BetFriends.Bets.Domain.Members;
using MediatR;

namespace BetFriends.Bets.Application.Features.CreateBet;

public class NotifyBetCreatedNotificationHandler : INotificationHandler<BetCreatedEventNotification>
{
    private readonly IEnumerable<INotifier> notifiers;
    private readonly IBetRepository betRepository;
    private readonly IMemberRepository memberRepository;

    public NotifyBetCreatedNotificationHandler(IEnumerable<INotifier> notifiers,
                                               IBetRepository betRepository,
                                               IMemberRepository memberRepository)
    {
        this.notifiers = notifiers;
        this.betRepository = betRepository;
        this.memberRepository = memberRepository;
    }
    public async Task Handle(BetCreatedEventNotification notification, CancellationToken cancellationToken)
    {
        var bet = await betRepository.GetByIdAsync(new BetId(notification.BetId));
        if (bet == null)
            return;

        var tasks = new List<Task>();
        var members = await memberRepository.GetByIdsAsync(bet.Guests);
        foreach (var notifier in notifiers)
        {
            tasks.Add(notifier.Notify(members));
        }
        await Task.WhenAll(tasks);
    }
}

public interface INotifier
{
    Task Notify(IEnumerable<Member> guests);
}
