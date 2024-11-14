using BetFriends.Application.Features.AnswerBet;
using BetFriends.Application.Features.CreateBet;
using BetFriends.Domain;
using BetFriends.Domain.Events;
using MediatR;

namespace BetFriends.Infrastructure.Event
{
    internal class DomainEventNotificationFactory
    {
        public INotification Create(IDomainEvent domainEvent)
        {
            return domainEvent switch
            {
                BetCreated bc => new BetCreatedNotification(bc.BetId, bc.OwnerId, bc.Coins),
                BetAnswered ba => new BetAnsweredNotification(ba.BetId, ba.MemberId, ba.Answer),
                _ => null!,
            };
        }
    }
}
