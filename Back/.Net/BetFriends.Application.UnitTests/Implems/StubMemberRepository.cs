using BetFriends.Domain.Members;

namespace BetFriends.Application.UnitTests.Implems;

internal class StubMemberRepository(Member member) : IMemberRepository
{
    private Member member = member;

    public Task<Member> GetByIdAsync(MemberId memberId)
    {
        return Task.FromResult(member);
    }
}
