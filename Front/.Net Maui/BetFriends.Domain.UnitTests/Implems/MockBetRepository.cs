using BetFriends.Domain.Abstractions;
using BetFriends.Domain.Bets;
using BetFriends.Domain.Features.CreateBet;
using BetFriends.Domain.Features.RetrieveBets;

namespace BetFriends.Domain.UnitTests.Implems;

internal class MockBetRepository(IUserContext userContext) : IBetRepository
{
    private readonly IUserContext userContext = userContext;
    private List<Bet> bets = new List<Bet>();
    private readonly List<Tuple<string, string, bool>> answers = [];


    public IReadOnlyCollection<Bet> Bets { get => bets; }

    internal IReadOnlyCollection<Tuple<string, string, bool>> Answers => answers;

    internal List<Tuple<string, bool>> BetsCompleted { get; } = new List<Tuple<string, bool>>();

    public Task SaveAsync(Bet bet, CancellationToken cancellationToken)
    {
        bets.Add(bet);
        return Task.CompletedTask;
    }

    public Task<IEnumerable<RetrieveBetsItemResponse>> RetrieveBetsAsync()
    {
        throw new NotImplementedException();
    }

    public Task AnswerBetAsync(string betId, bool answer)
    {
        answers.Add(new(betId, userContext.UserId, answer));
        return Task.CompletedTask;
    }

    public Task CompleteBetAsync(string betId, bool isSuccess, string? proof, CancellationToken cancellationToken)
    {
        BetsCompleted.Add(new Tuple<string, bool>(betId, isSuccess));
        return Task.CompletedTask;
    }

    public Task<byte[]> RetrieveProofAsync(string betId)
    {
        throw new NotImplementedException();
    }
}
