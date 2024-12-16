using BetFriends.Bets.Application.Features.CompleteBet;
using BetFriends.Bets.Application.Features.CreateBet;

namespace BetFriends.Bets.Infrastructure.Notifiers;

internal class NotifyBetCompleted(IEnumerable<INotifier> notifiers) : INotifyBetCompleted
{
    private readonly IEnumerable<INotifier> notifiers = notifiers;

    public Task Notify(Notification notification)
    {
        return Task.CompletedTask;
    }
}
