
using BetFriends.Bets.Application.Features.AnswerBet;
using BetFriends.Bets.Application.UnitTests.Implems;
using BetFriends.Bets.Domain.AnswerBets;
using BetFriends.Bets.Domain.Bets;
using BetFriends.Bets.Domain.Members;

namespace BetFriends.Bets.Application.UnitTests.SUTs;

internal class AnswerBetHandlerSut
{
    private readonly MockAnswerBetRepository answerBetRepository;
    private MockBetRepository betRepository = default!;
    private readonly MockAnswerBetOutputPort outputPort;
    private StubUserContext userContext;
    private StubDateProvider dateProvider = default!;
    private StubMemberRepository memberRepository = default!;

    public AnswerBetHandlerSut()
    {
        answerBetRepository = new();
        outputPort = new();
        betRepository = new();
        userContext = new(Guid.Empty);
        memberRepository = new(default!);
    }

    internal void ShouldSaveAnswer(bool answer, Guid betId)
    {
        Assert.Equal(true, outputPort.IsSuccess);
        Assert.Collection(answerBetRepository.Answers, answerBet =>
        {
            Assert.Equal(new AnswerBetState(new(betId), new(userContext.UserId), answer), answerBet.State);
        });
    }

    internal async Task<AnswerBetHandlerSut> WhenExecuteHandler(AnswerBetCommand answerBetCommand)
    {
        var handler = new AnswerBetCommandHandler(answerBetRepository,
                                                  outputPort,
                                                  betRepository,
                                                  userContext,
                                                  dateProvider,
                                                  memberRepository);
        await handler.Handle(answerBetCommand, default!);
        return this;
    }

    internal AnswerBetHandlerSut WithBet(Bet bet)
    {
        betRepository = new MockBetRepository(bet);
        return this;
    }

    internal AnswerBetHandlerSut WithMember(Member member)
    {
        memberRepository = new StubMemberRepository(member);
        return this;
    }

    internal void ShouldNotSaveAnswer(string errorMessage)
    {
        Assert.Empty(answerBetRepository.Answers);
        Assert.False(outputPort.IsSuccess);
        Assert.Equal(errorMessage, outputPort.Message);
    }

    internal AnswerBetHandlerSut WithAuthenticatedUser(Guid userId)
    {
        userContext = new StubUserContext(userId);
        return this;
    }

    internal AnswerBetHandlerSut WithCurrentDate(DateTime currentDate)
    {
        dateProvider = new StubDateProvider(currentDate);
        return this;
    }
}
