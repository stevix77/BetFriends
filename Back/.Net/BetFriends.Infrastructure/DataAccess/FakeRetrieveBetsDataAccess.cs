using BetFriends.Application.Features.RetrieveBets;
using BetFriends.Infrastructure.Repositories;

namespace BetFriends.Infrastructure.DataAccess;

internal class FakeRetrieveBetsDataAccess(FakeBetRepository fakeBetRepository, FakeMemberRepository fakeMemberRepository) : IRetrieveBetsDataAccess
{
    private readonly FakeBetRepository fakeBetRepository = fakeBetRepository;
    private readonly FakeMemberRepository fakeMemberRepository = fakeMemberRepository;

    public Task<IEnumerable<RetrieveBetsResponse>> GetAsync(Guid memberId)
    {
        var bets = fakeBetRepository.Bets.Where(x => x.OwnerId.Value == memberId ||
                                        x.Guests.Contains(memberId))
                                     .Select(x =>
                                     {
                                         var owner = fakeMemberRepository.Members.FirstOrDefault(y => y.MemberId.Value == x.OwnerId.Value);
                                         return new RetrieveBetsResponse(x.BetId.Value, x.Description, x.EndDate, x.Chips, owner.MemberId.Value, owner.Username);
                                     });
        return Task.FromResult(bets);
    }
}
