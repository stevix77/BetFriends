using BetFriend.Domain.Friends;
using BetFriends.Domain.Abstractions;
using BetFriends.Domain.Features.RetrieveFriends;

namespace BetFriend.Infrastructure.Repository;

internal class InMemoryFriendRepository : IFriendRepository
{
    private readonly List<string> friends = new();
    private readonly IMemberRepository memberRepository;

    public InMemoryFriendRepository(IMemberRepository memberRepository)
    {
        this.memberRepository = memberRepository;
    }
    public Task AddAsync(string id, CancellationToken cancellationToken)
    {
        friends.Add(id);
        return Task.CompletedTask;
    }

    public async Task<IReadOnlyCollection<FriendDto>> GetFriendsAsync()
    {
        var friends = (await memberRepository.RetrieveMembersByKeyword(string.Empty)).Where(x => x.IsFriend);
        return friends.Select(x => new FriendDto(x.MemberId, x.Name)).ToList();
    }
}
