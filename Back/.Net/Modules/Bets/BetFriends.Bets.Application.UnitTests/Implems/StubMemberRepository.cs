using BetFriends.Bets.Domain.Members;

namespace BetFriends.Bets.Application.UnitTests.Implems;

internal class StubMemberRepository(Member member) : IMemberRepository
{
    private readonly Member member = member;

    internal Member Member { get => member; }
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

    public Task SaveAsync(IEnumerable<Member> gamblers)
    {
        return Task.CompletedTask;
    }
}
