using BetFriends.Domain.Abstractions;
using BetFriends.Domain.Features.RetrieveInfo;
using BetFriends.Domain.Features.RetrieveMembers;

namespace BetFriends.Infrastructure.Repository;

internal class InMemoryMemberRepository : IMemberRepository
{
    private List<MemberDto> members = new();
    private readonly IUserContext userContext;

    public InMemoryMemberRepository(IUserContext userContext)
    {
        var membersCount = new Random().Next(10, 50);
        for (var i = 0; i < membersCount; i++)
        {
            var id = Guid.NewGuid().ToString();
            members.Add(new MemberDto(Guid.NewGuid().ToString(), id[..8], new Random().Next(1000) % 2 == 0));
        }
        members.Add(new MemberDto(userContext.UserId, userContext.UserId[..8], false));
        this.userContext = userContext;
    }
    public Task<IReadOnlyCollection<MemberDto>> RetrieveMembersByKeyword(string searchTerm)
    {
        return Task.FromResult<IReadOnlyCollection<MemberDto>>(members);
    }

    public Task<RetrieveInfoResponse> RetrieveInfoAsync()
    {
        var member = members.First(x => x.MemberId == userContext.UserId);
        return Task.FromResult(new RetrieveInfoResponse(member.Name, 2000));
    }

    internal IReadOnlyCollection<MemberDto> Members { get =>  members; }
}
