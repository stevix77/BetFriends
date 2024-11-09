using BetFriend.Domain.Friends;
using BetFriends.Domain.Abstractions;
using BetFriends.Domain.Features.RetrieveFriends;
using BetFriends.Infrastructure.Repository;

namespace BetFriend.Infrastructure.Repository;

internal class InMemoryFriendRepository : IFriendRepository
{
    private readonly List<string> friends = new();
    private readonly InMemoryMemberRepository memberRepository;

    public InMemoryFriendRepository(InMemoryMemberRepository memberRepository)
    {
        this.memberRepository = memberRepository;
    }
    public Task AddAsync(string id, CancellationToken cancellationToken)
    {
        friends.Add(id);
        var member = memberRepository.Members.First(x => x.MemberId == id);
        member.IsFriend = true;
        return Task.CompletedTask;
    }

    public async Task<IReadOnlyCollection<FriendDto>> GetFriendsAsync()
    {
        var friends = (await memberRepository.RetrieveMembersByKeyword(string.Empty)).Where(x => x.IsFriend);
        return friends.Select(x => new FriendDto(x.MemberId, x.Name)).ToList();
    }
}
