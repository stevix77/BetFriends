
namespace BetFriends.Domain.Members;

public interface IMemberRepository
{
    Task<Member> GetByIdAsync(MemberId memberId);
}
