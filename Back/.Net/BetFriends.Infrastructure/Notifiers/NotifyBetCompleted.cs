using BetFriends.Application.Features.CompleteBet;
using BetFriends.Application.Features.CreateBet;

namespace BetFriends.Infrastructure.Notifiers;

internal class NotifyBetCompleted(IEnumerable<INotifier> notifiers) : INotifyBetCompleted
{
    private readonly IEnumerable<INotifier> notifiers = notifiers;

    public Task Notify(Notification notification)
    {
        return Task.CompletedTask;
    }
}
