using BetFriends.Domain.Abstractions;
using BetFriends.Domain.Features.RetrieveMembers;

namespace BetFriends.Infrastructure.Repository;

internal class InMemoryMemberRepository : IMemberRepository
{
    private List<MemberDto> members = new();
    public InMemoryMemberRepository(IUserContext userContext)
    {
        var membersCount = new Random().Next(10, 50);
        for (var i = 0; i < membersCount; i++)
        {
            var id = Guid.NewGuid().ToString();
            members.Add(new MemberDto(Guid.NewGuid().ToString(), id.Substring(0, 8), new Random().Next(1000) % 2 == 0));
        }
        members.Add(new MemberDto(userContext.UserId, userContext.UserId.Substring(0, 8), false));
    }
    public Task<IReadOnlyCollection<MemberDto>> RetrieveMembersByKeyword(string searchTerm)
    {
        return Task.FromResult<IReadOnlyCollection<MemberDto>>(members);
    }

    internal IReadOnlyCollection<MemberDto> Members { get =>  members; }
}
