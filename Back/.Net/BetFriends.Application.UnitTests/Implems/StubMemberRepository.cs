using BetFriends.Domain.Members;

namespace BetFriends.Application.UnitTests.Implems;

internal class StubMemberRepository(Member member) : IMemberRepository
{
    private readonly Member member = member;

    public Task<Member> GetByIdAsync(MemberId memberId)
    {
        if(member?.MemberId == memberId)
            return Task.FromResult(member);
        return Task.FromResult<Member>(default!);
    }

    public Task<IEnumerable<Member>> GetByIdsAsync(IEnumerable<Guid> guests)
    {
        return Task.FromResult<IEnumerable<Member>>([member]);
    }

    public Task SaveAsync(Member member)
    {
        return Task.CompletedTask;
    }
}
