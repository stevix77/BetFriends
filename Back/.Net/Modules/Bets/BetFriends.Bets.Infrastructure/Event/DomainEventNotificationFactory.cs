using BetFriends.Bets.Application.Features.AnswerBet;
using BetFriends.Bets.Application.Features.CompleteBet;
using BetFriends.Bets.Application.Features.CreateBet;
using BetFriends.Bets.Domain.Events;
using BetFriends.Shared.Domain;
using MediatR;

namespace BetFriends.Bets.Infrastructure.Event
{
    internal class DomainEventNotificationFactory
    {
        public INotification Create(IDomainEvent domainEvent)
        {
            return domainEvent switch
            {
                BetCreated bc => new BetCreatedNotification(bc.BetId, bc.OwnerId, bc.Coins),
                BetAnswered ba => new BetAnsweredNotification(ba.BetId, ba.MemberId, ba.Answer),
                BetCompleted bc => new BetCompletedNotification(bc.BetId, bc.IsSuccessful),
                _ => null!,
            };
        }
    }
}
