
using BetFriends.Application.Features.AnswerBet;
using BetFriends.Application.UnitTests.Implems;
using BetFriends.Domain.Bets;

namespace BetFriends.Application.UnitTests.SUTs;

internal class AnswerBetHandlerSut
{
    private readonly Guid betId;
    private readonly MockAnswerBetRepository answerBetRepository;
    private MockBetRepository betRepository = default!;
    private readonly MockAnswerBetOutputPort outputPort;

    public AnswerBetHandlerSut(Guid betId)
    {
        this.betId = betId;
        answerBetRepository = new();
        outputPort = new();
        betRepository = new();
    }

    internal void ShouldSaveAnswer()
    {
        Assert.Equal(true, outputPort.IsSuccess);
        Assert.NotEmpty(answerBetRepository.Answers);
    }

    internal async Task<AnswerBetHandlerSut> WhenExecuteHandler(AnswerBetCommand answerBetCommand)
    {
        var handler = new AnswerBetCommandHandler(answerBetRepository, outputPort, betRepository);
        await handler.Handle(answerBetCommand, default!);
        return this;
    }

    internal AnswerBetHandlerSut WithBet(Bet bet)
    {
        betRepository = new MockBetRepository(bet);
        return this;
    }

    internal void ShouldNotSaveAnswer(string errorMessage)
    {
        Assert.Empty(answerBetRepository.Answers);
        Assert.False(outputPort.IsSuccess);
        Assert.Equal(errorMessage, outputPort.Message);
    }
}
