

namespace BetFriends.Domain.Members;

public interface IMemberRepository
{
    Task<Member> GetByIdAsync(MemberId memberId);
    Task<IEnumerable<Member>> GetByIdsAsync(IEnumerable<Guid> guests);
    Task SaveAsync(Member member);
    Task SaveAsync(IEnumerable<Member> gamblers);
}
