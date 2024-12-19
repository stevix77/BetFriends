using BetFriends.Domain.Features.RetrieveInfo;
using BetFriends.Domain.Features.RetrieveMembers;

namespace BetFriends.Domain.Abstractions;

public interface IMemberRepository
{
    Task<RetrieveInfoResponse> RetrieveInfoAsync();
    Task<IReadOnlyCollection<MemberDto>> RetrieveMembersByKeyword(string searchTerm);
}
