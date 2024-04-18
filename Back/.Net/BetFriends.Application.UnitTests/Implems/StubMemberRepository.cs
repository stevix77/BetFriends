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
}
