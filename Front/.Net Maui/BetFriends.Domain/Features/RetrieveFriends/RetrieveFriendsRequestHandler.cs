using BetFriend.Domain.Friends;
using MediatR;

namespace BetFriends.Domain.Features.RetrieveFriends;

internal class RetrieveFriendsRequestHandler : IRequestHandler<RetrieveFriendsRequest, IReadOnlyCollection<FriendDto>>
{
    private readonly IFriendRepository friendRepository;

    public RetrieveFriendsRequestHandler(IFriendRepository friendRepository)
    {
        this.friendRepository = friendRepository;
    }

    public Task<IReadOnlyCollection<FriendDto>> Handle(RetrieveFriendsRequest request, CancellationToken cancellationToken)
        => friendRepository.GetFriendsAsync();
}

public record RetrieveFriendsRequest() : IRequest<IReadOnlyCollection<FriendDto>>;

public record FriendDto(string Id, string Name);
