using BetFriends.Domain.Features.AnswerBet;
using BetFriends.Domain.UnitTests.Implems;

namespace BetFriends.Domain.UnitTests;

public class AnswerBetHandlerTest
{
    [Fact]
    public async Task ShouldAnswerBetWithValidData()
    {
        var request = new AnswerBetRequest(true,
                                        "betId",
                                        "bookieId",
                                        new DateTime(2024, 12, 12));
        var userContext = new StubUserContext("bookieId");
        var betRepository = new MockBetRepository(userContext);
        var outputPort = new MockAnswerBetPresenter();
        var handler = new AnswerBetCommandHandler(betRepository,
                                                  outputPort,
                                                  new StubDateTimeProvider(new DateTime(2024, 11, 12)),
                                                  new StubUserContext("userId"));
        await handler.Handle(request, default!);
        Assert.Equal(new AnswerBetResponse(request.Answer, request.BetId), outputPort.AnswerResponse);
        Assert.Null(outputPort.Error);
        Assert.Contains(betRepository.Answers, answer => answer.Item1 == request.BetId &&
                                                         answer.Item2 == userContext.UserId &&
                                                         answer.Item3 == request.Answer);
    }

    [Fact]
    public async Task ShouldNotAnswerWhenEndDateIsBeforeCurrentDate()
    {
        var request = new AnswerBetRequest(true,
                                        "betId",
                                        "bookieId",
                                        new DateTime(2024, 12, 12));
        var userContext = new StubUserContext("bookieId");
        var betRepository = new MockBetRepository(userContext);
        var outputPort = new MockAnswerBetPresenter();
        var handler = new AnswerBetCommandHandler(betRepository,
                                                  outputPort,
                                                  new StubDateTimeProvider(new DateTime(2025, 12, 12)),
                                                  new StubUserContext("userId"));
        await handler.Handle(request, default!);
        Assert.Equal("Invalid EndDate", outputPort.Error);
        Assert.Null(outputPort.AnswerResponse);
        Assert.Empty(betRepository.Answers);
    }

    [Fact]
    public async Task ShouldNotAnswerWithTheSameOldAnswer()
    {
        var request = new AnswerBetRequest(true,
                                        "betId",
                                        "bookieId",
                                        new DateTime(2024, 12, 12),
                                        true);
        var userContext = new StubUserContext("bookieId");
        var betRepository = new MockBetRepository(userContext);
        var outputPort = new MockAnswerBetPresenter();
        var handler = new AnswerBetCommandHandler(betRepository,
                                                  outputPort,
                                                  new StubDateTimeProvider(new DateTime(2024, 11, 12)),
                                                  new StubUserContext("userId"));
        await handler.Handle(request, default!);
        Assert.Equal("Invalid answer", outputPort.Error);
        Assert.Null(outputPort.AnswerResponse);
        Assert.Empty(betRepository.Answers);
    }

    [Fact]
    public async Task ShouldNotAnswerToAnOwnBet()
    {
        var request = new AnswerBetRequest(false,
                                        "betId",
                                        "bookieId",
                                        new DateTime(2024, 12, 12),
                                        true);
        var userContext = new StubUserContext("bookieId");
        var betRepository = new MockBetRepository(userContext);
        var outputPort = new MockAnswerBetPresenter();
        var handler = new AnswerBetCommandHandler(betRepository,
                                                  outputPort,
                                                  new StubDateTimeProvider(new DateTime(2024, 11, 12)),
                                                  userContext);
        await handler.Handle(request, default!);
        Assert.Equal("Cannot answer to own bet", outputPort.Error);
        Assert.Null(outputPort.AnswerResponse);
        Assert.Empty(betRepository.Answers);
    }
}

