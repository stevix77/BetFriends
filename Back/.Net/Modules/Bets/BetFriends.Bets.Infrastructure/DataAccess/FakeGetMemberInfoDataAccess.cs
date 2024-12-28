using BetFriends.Bets.Application.Features.MemberInfo;
using BetFriends.Bets.Infrastructure.Repositories;

namespace BetFriends.Bets.Infrastructure.DataAccess;

internal class FakeGetMemberInfoDataAccess(FakeMemberRepository fakeMemberRepository) : IGetMemberInfoDataAccess
{
    private readonly FakeMemberRepository fakeMemberRepository = fakeMemberRepository;

    public Task<GetMemberInfoResponse> GetAsync(Guid userId)
    {
        var member = fakeMemberRepository.Members.FirstOrDefault(x => x.MemberId.Value == userId);
        if (member == null)
            return null!;

        var state = member.State;
        return Task.FromResult(new GetMemberInfoResponse(state.Username, state.Coins));
    }
}
