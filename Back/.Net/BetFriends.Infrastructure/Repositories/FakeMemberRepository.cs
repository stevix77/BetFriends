using BetFriends.Domain.Members;

namespace BetFriends.Infrastructure.Repositories;

internal class FakeMemberRepository : IMemberRepository
{
    private readonly List<Member> members;
    public FakeMemberRepository()
    {
        members = new() { new Member(new MemberId(Guid.Parse("11111111-1111-1111-1111-111111111111")))};
    }
    public Task<Member> GetByIdAsync(MemberId memberId)
    {
        return Task.FromResult(members.FirstOrDefault(x => x.MemberId == memberId))!;
    }
}
