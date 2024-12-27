using BetFriends.Bets.Application.Features.RetrieveBets;
using BetFriends.Bets.Infrastructure.Repositories;

namespace BetFriends.Bets.Infrastructure.DataAccess;

internal class FakeRetrieveBetsDataAccess(FakeBetRepository fakeBetRepository, 
                                        FakeMemberRepository fakeMemberRepository,
                                        FakeAnswerBetRepository fakeAnswerBetRepository) : IRetrieveBetsDataAccess
{
    private readonly FakeBetRepository fakeBetRepository = fakeBetRepository;
    private readonly FakeMemberRepository fakeMemberRepository = fakeMemberRepository;
    private readonly FakeAnswerBetRepository fakeAnswerBetRepository = fakeAnswerBetRepository;

    public Task<IEnumerable<RetrieveBetsResponse>> GetAsync(Guid memberId)
    {
        var bets = fakeBetRepository.Bets.Where(x => x.BookieId.Value == memberId ||
                                        x.Guests.Contains(memberId))
                                     .Select(x =>
                                     {
                                         var owner = fakeMemberRepository.Members.FirstOrDefault(y => y.MemberId.Value == x.BookieId.Value);
                                         var gamblers = fakeMemberRepository.Members.Where(y => x.Guests.Contains(y.MemberId.Value));
                                         return new RetrieveBetsResponse(x.BetId.Value,
                                                                         x.Description,
                                                                         x.EndDate,
                                                                         x.Coins,
                                                                         owner!.MemberId.Value,
                                                                         owner!.State.Username,
                                                                         x.MaxAnswerDate.Value,
                                                                         gamblers.Select(y =>
                                                                         {
                                                                             var answer = fakeAnswerBetRepository
                                                                                            .Answers
                                                                                            .FirstOrDefault(a => a.BetId == x.BetId &&
                                                                                                                a.MemberId == y.MemberId);
                                                                             return new GamblerDto(y.MemberId.Value, y.State.Username, answer?.Answer);
                                                                         }));
                                     });
        return Task.FromResult(bets);
    }
}
