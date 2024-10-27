using BetFriends.Application.Features.RetrieveBets;
using BetFriends.Infrastructure.Repositories;

namespace BetFriends.Infrastructure.DataAccess;

internal class FakeRetrieveBetsDataAccess(FakeBetRepository fakeBetRepository) : IRetrieveBetsDataAccess
{
    private readonly FakeBetRepository fakeBetRepository = fakeBetRepository;

    public Task<IEnumerable<RetrieveBetsResponse>> GetAsync(Guid memberId)
    {
        var bets = fakeBetRepository.Bets.Where(x => x.OwnerId.Value == memberId ||
                                        x.Guests.Contains(memberId))
                                     .Select(x => new RetrieveBetsResponse(x.BetId.Value, x.Description, x.EndDate, x.Chips, x.OwnerId.Value));
        return Task.FromResult(bets);
    }
}
