using BetFriends.Domain.Bets;
using BetFriends.Domain.Features.CreateBet;
using BetFriends.Domain.Features.RetrieveBets;

namespace BetFriends.Infrastructure.Repository;

internal class InMemoryBetRepository : IBetRepository
{
    private readonly List<Bet> bets = [];
    private readonly InMemoryMemberRepository memberRepository;
    private readonly Dictionary<Guid, Guid> betsUsers = new();

    public InMemoryBetRepository(InMemoryMemberRepository memberRepository)
    {
        bets = new List<Bet>()
        {
            new Bet(Guid.NewGuid().ToString(), "test", new DateTime(2025, 1, 1), 150, memberRepository.Members.Select(x => x.MemberId))
        };
        this.memberRepository = memberRepository;
    }
    public Task<IEnumerable<RetrieveBetsItemResponse>> RetrieveBetsAsync()
    {
        return Task.FromResult(bets.Select(x => 
                new RetrieveBetsItemResponse(Guid.Parse(x.Id),
                                            x.Description,
                                            x.Coins,
                                            x.EndDate,
                                            Guid.Empty,
                                            x.Id[^6..],
                                            x.Friends.Select(y =>
                                            {
                                                var member = this.memberRepository.Members.FirstOrDefault(m => m.MemberId == y);
                                                return new GamblerDto(new(member.MemberId), member.Name, null!);
                                            }))));
    }

    public Task SaveAsync(Bet bet, CancellationToken cancellationToken)
    {
        bets.Add(bet);
        return Task.CompletedTask;
    }
}
