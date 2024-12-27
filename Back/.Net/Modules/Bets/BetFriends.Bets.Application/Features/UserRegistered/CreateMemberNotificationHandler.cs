using BetFriends.Bets.Domain.Members;
using BetFriends.Bets.Domain.Members.Exceptions;
using MediatR;

namespace BetFriends.Bets.Application.Features.UserRegistered;

public sealed class CreateMemberNotificationHandler(IMemberRepository memberRepository) : INotificationHandler<UserRegisteredNotification>
{
    private readonly IMemberRepository memberRepository = memberRepository;

    public async Task Handle(UserRegisteredNotification notification, CancellationToken cancellationToken)
    {
        var isMemberExist = await memberRepository.IsMemberExistAsync(new MemberId(notification.UserId));
        if (isMemberExist)
            throw new MemberAlreadyExistException();

        Member member = Member.Create(new MemberId(notification.UserId), notification.Username);
        await memberRepository.SaveAsync(member);
    }
}
