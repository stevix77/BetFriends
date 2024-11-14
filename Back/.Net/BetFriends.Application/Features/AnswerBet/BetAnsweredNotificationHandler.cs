using BetFriends.Domain.Bets;
using BetFriends.Domain.Members.Services;
using MediatR;

namespace BetFriends.Application.Features.AnswerBet;

public sealed class BetAnsweredNotificationHandler(DecreaseCoinsMember decreaseCoinsMember, 
                                                    IBetRepository betRepository) : INotificationHandler<BetAnsweredNotification>
{
    private readonly DecreaseCoinsMember decreaseCoinsMember = decreaseCoinsMember;
    private readonly IBetRepository betRepository = betRepository;

    public async Task Handle(BetAnsweredNotification notification, CancellationToken cancellationToken)
    {
        if (!notification.Answer)
            return;

        var bet = await betRepository.GetByIdAsync(notification.BetId);
        if(bet is not null)
            await decreaseCoinsMember.Decrease(notification.MemberId, bet.Coins);
    }
}
