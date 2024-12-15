using BetFriends.Application.Abstractions;
using BetFriends.Domain.Friends;
using BetFriends.Domain.Members;
using BetFriends.Shared.Application.Abstractions.Messaging;

namespace BetFriends.Application.Features.AddFriend;

public class AddFriendCommandHandler(IMemberRepository memberRepository,
                                     IFriendshipRepository friendRepository,
                                     IUserContext userContext,
                                     IAddFriendOutputPort addFriendOutputPort) : ICommandHandler<AddFriendRequest>
{
    public async Task Handle(AddFriendRequest request, CancellationToken cancellationToken)
    {
        var member = await memberRepository.GetByIdAsync(new MemberId(request.MemberId));
        if (member is null)
        {
            addFriendOutputPort.MemberDoesNotExist();
            return;
        }

        var friendship = member.AddFriendship(userContext.UserId);
        await friendRepository.SaveAsync(friendship);
        addFriendOutputPort.Present();
    }
}

public record AddFriendRequest(Guid MemberId) : ICommand;

public interface IAddFriendOutputPort
{
    void MemberDoesNotExist();
    void Present();
}