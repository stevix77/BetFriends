using BetFriends.Bets.Domain.Members.Services;
using MediatR;

namespace BetFriends.Bets.Application.Features.CreateBet;

public sealed class BetCreatedNotificationHandler(DecreaseCoinsMember decreaseCoinsMember) : INotificationHandler<BetCreatedNotification>
{
    private readonly DecreaseCoinsMember decreaseCoinsMember = decreaseCoinsMember;

    public Task Handle(BetCreatedNotification notification, CancellationToken cancellationToken)
    {
        return decreaseCoinsMember.Decrease(notification.OwnerId, notification.Coins);
    }
}
