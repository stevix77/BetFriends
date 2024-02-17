using BetFriends.Domain.Features.RetrieveMembers;

namespace BetFriends.Domain.Abstractions;

public interface IMemberRepository
{
    Task<IReadOnlyCollection<MemberDto>> RetrieveMembersByKeyword(string searchTerm);
}
