using BetFriends.Domain.Abstractions;
using BetFriends.Domain.Bets;
using BetFriends.Domain.Features.CreateBet;
using BetFriends.Domain.Features.RetrieveBets;

namespace BetFriends.Infrastructure.Repository;

internal class InMemoryBetRepository : IBetRepository
{
    private readonly List<Bet> bets = [];
    private readonly InMemoryMemberRepository memberRepository;
    private readonly IUserContext userContext;
    private readonly Dictionary<string, string> betsUsers = new();

    public InMemoryBetRepository(InMemoryMemberRepository memberRepository, IUserContext userContext)
    {
        bets = new List<Bet>()
        {
            new Bet(Guid.NewGuid().ToString(), "test", new DateTime(2025, 1, 1), 150, memberRepository.Members.Select(x => x.MemberId).Concat([userContext.UserId]))
        };
        this.memberRepository = memberRepository;
        this.userContext = userContext;
    }

    public Task AnswerBetAsync(string betId, bool answer)
    {
        return Task.CompletedTask;
    }

    public Task<IEnumerable<RetrieveBetsItemResponse>> RetrieveBetsAsync()
    {
        return Task.FromResult(bets.Select(x => 
                new RetrieveBetsItemResponse(x.Id,
                                            x.Description,
                                            x.Coins,
                                            x.EndDate,
                                            x.EndDate,
                                            betsUsers.ContainsKey(x.Id) ? betsUsers[x.Id] : "toto",
                                            betsUsers.ContainsKey(x.Id) ? betsUsers[x.Id][^6..] : "toto",
                                            x.Friends.Select(y =>
                                            {
                                                var member = this.memberRepository.Members.FirstOrDefault(m => m.MemberId == y);
                                                return new GamblerDto(member.MemberId, member.Name, null!);
                                            }),
                                            null)));
    }

    public Task SaveAsync(Bet bet, CancellationToken cancellationToken)
    {
        bets.Add(bet);
        betsUsers.Add(bet.Id, userContext.UserId);
        return Task.CompletedTask;
    }
}
