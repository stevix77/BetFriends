using BetFriends.Bets.Domain.Members;

namespace BetFriends.Bets.Application.UnitTests.Implems;

internal class MockMemberRepository(Member member = null!) : IMemberRepository
{
    internal Member Member { get; private set; } = member;

    public Task<Member> GetByIdAsync(MemberId memberId)
    {
        throw new NotImplementedException();
    }

    public Task<IEnumerable<Member>> GetByIdsAsync(IEnumerable<Guid> guests)
    {
        throw new NotImplementedException();
    }

    public Task<bool> IsMemberExistAsync(MemberId memberId)
    {
        return Task.FromResult(Member?.State.MemberId == memberId.Value);
    }

    public Task SaveAsync(Member member)
    {
        Member = member;
        return Task.CompletedTask;
    }

    public Task SaveAsync(IEnumerable<Member> gamblers)
    {
        throw new NotImplementedException();
    }
}
