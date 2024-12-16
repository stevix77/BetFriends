using BetFriends.Bets.Domain.Members;

namespace BetFriends.Bets.Infrastructure.Repositories;

internal class FakeMemberRepository : IMemberRepository
{
    private readonly List<Member> members;
    internal IReadOnlyCollection<Member> Members { get => members; }
    public FakeMemberRepository()
    {
        members = new() 
        { 
            new Member(new MemberId(Guid.Parse("11111111-1111-1111-1111-111111111111")), "username", 2000, 3),
            new Member(new MemberId(Guid.Parse("adadadad-1111-6666-4444-edededededed")), "toto", 2000, 3),

        };
    }
    public Task<Member> GetByIdAsync(MemberId memberId)
    {
        return Task.FromResult(members.FirstOrDefault(x => x.MemberId == memberId))!;
    }

    public Task<IEnumerable<Member>> GetByIdsAsync(IEnumerable<Guid> memberIds)
    {
        return Task.FromResult(members.Where(x => memberIds.Contains(x.MemberId.Value)));
    }

    public Task SaveAsync(Member member)
    {
        if(!members.Any(x => x.MemberId == member.MemberId))
        {
            members.Add(member);
            return Task.CompletedTask;
        }
        return Task.CompletedTask;
    }

    public Task SaveAsync(IEnumerable<Member> gamblers)
    {
        return Task.CompletedTask;
    }
}
