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
    private readonly Dictionary<string, Tuple<bool, string?>> betsCompleted = new();
    private readonly Dictionary<string, List<Tuple<string, bool>>> betsAnswered = new();

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
        if(!betsAnswered.ContainsKey(betId))
        {
            betsAnswered.Add(betId, new() { new Tuple<string, bool>(userContext.UserId, answer) });
            return Task.CompletedTask;
        }
        var bet = betsAnswered[betId];
        if(bet.Any(x => x.Item1 == userContext.UserId))
        {
            var betUser = bet.First(x => x.Item1 == userContext.UserId);
            betsAnswered[betId].Remove(betUser);
        }
        betsAnswered[betId].Add(new Tuple<string, bool>(userContext.UserId, answer));
        return Task.CompletedTask;
    }

    public Task CompleteBetAsync(string betId, bool isSuccess, string? proof, CancellationToken cancellationToken)
    {
        betsCompleted.Add(betId, new Tuple<bool, string?>(isSuccess, proof));
        return Task.CompletedTask;
    }

    public Task<IEnumerable<RetrieveBetsItemResponse>> RetrieveBetsAsync()
    {
        return Task.FromResult(bets.Select(x =>
        {
            var isSuccess = betsCompleted.TryGetValue(x.Id, out Tuple<bool, string?>? value) ? value.Item1 : new bool?();
            
            return new RetrieveBetsItemResponse(x.Id,
                                            x.Description,
                                            x.Coins,
                                            x.EndDate,
                                            x.EndDate,
                                            betsUsers.ContainsKey(x.Id) ? betsUsers[x.Id] : "toto",
                                            betsUsers.ContainsKey(x.Id) ? betsUsers[x.Id][^6..] : "toto",
                                            x.Friends.Select(y =>
                                            {
                                                var answer = new bool?();
                                                if (betsAnswered.ContainsKey(x.Id))
                                                {
                                                    answer = betsAnswered[x.Id].FirstOrDefault(a => a.Item1 == y)?.Item2;
                                                }
                                                var member = this.memberRepository.Members.FirstOrDefault(m => m.MemberId == y);
                                                return new GamblerDto(member.MemberId, member.Name, answer);
                                            }),
                                            isSuccess);
        }));
    }

    public Task SaveAsync(Bet bet, CancellationToken cancellationToken)
    {
        bets.Add(bet);
        betsUsers.Add(bet.Id, userContext.UserId);
        return Task.CompletedTask;
    }
}
