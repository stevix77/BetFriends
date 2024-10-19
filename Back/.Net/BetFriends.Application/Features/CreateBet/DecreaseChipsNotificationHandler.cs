using BetFriends.Domain.Members;
using BetFriends.Domain.Members.Exceptions;
using MediatR;

namespace BetFriends.Application.Features.CreateBet;

public class DecreaseChipsNotificationHandler : INotificationHandler<BetCreatedNotification>
{
    private readonly IMemberRepository repository;

    public DecreaseChipsNotificationHandler(IMemberRepository repository)
    {
        this.repository = repository;
    }

    public async Task Handle(BetCreatedNotification notification, CancellationToken cancellationToken)
    {
        var member = await repository.GetByIdAsync(notification.OwnerId) ?? throw new MemberDoesNotExistException();
        member.Decrease(notification.Chips);
        await repository.SaveAsync(member);
    }
}
