using BetFriends.Application.Features.AnswerBet;
using BetFriends.Application.UnitTests.SUTs;
using BetFriends.Domain.Bets;
using BetFriends.Domain.Members;

namespace BetFriends.Application.UnitTests.Features;

public class AnswerBetHandlerTest
{
    [Fact]
    public async Task ShouldSaveAnAnswer()
    {
        var betId = Guid.NewGuid();
        var memberId = Guid.NewGuid();
        (await new AnswerBetHandlerSut()
                .WithBet(Bet.Create(new(betId),
                                    new MemberId(Guid.NewGuid()),
                                    "description",
                                    100,
                                    new DateTime(2024, 12, 12),
                                    [memberId],
                                    new DateTime(2024, 11, 12)))
                .WithCurrentDate(new DateTime(2024, 11, 12))
                .WithMember(new Member(new MemberId(memberId), "username", 200, 1))
                .WithAuthenticatedUser(memberId)
                .WhenExecuteHandler(new AnswerBetCommand(betId, true)))
                .ShouldSaveAnswer(true, betId);
    }

    [Fact]
    public async Task ShouldNotSaveAnswerWhenBetDoesNotExist()
    {
        var betId = Guid.NewGuid();
        (await new AnswerBetHandlerSut()
                .WithAuthenticatedUser(Guid.NewGuid())
                .WhenExecuteHandler(new AnswerBetCommand(betId, true)))
                .ShouldNotSaveAnswer("bet does not exist");
    }

    [Fact]
    public async Task ShouldNotSaveAnswerWhenMemberIsNotAuthorized()
    {
        var betId = Guid.NewGuid();
        var memberId = Guid.NewGuid();
        (await new AnswerBetHandlerSut()
                .WithAuthenticatedUser(memberId)
                .WithBet(Bet.Create(new(betId),
                                    new MemberId(Guid.NewGuid()),
                                    "description",
                                    100,
                                    new DateTime(2024, 12, 12),
                                    [Guid.NewGuid()],
                                    new DateTime(2024, 11, 12)))
                .WithCurrentDate(new DateTime(2024, 11, 12))
                .WithMember(new Member(new MemberId(memberId), "username", 200, 1))
                .WhenExecuteHandler(new AnswerBetCommand(betId, true)))
                .ShouldNotSaveAnswer("member is not authorized");
    }

    [Theory]
    [InlineData(2024, 11, 27)]
    [InlineData(2024, 11, 28)]
    public async Task ShouldNotSaveAnswerWhenTimeToAnswerIsOver(int year, int month, int day)
    {
        var betId = Guid.NewGuid();
        var memberId = Guid.NewGuid();
        (await new AnswerBetHandlerSut()
                .WithAuthenticatedUser(memberId)
                .WithBet(Bet.Create(new(betId),
                                    new MemberId(Guid.NewGuid()),
                                    "description",
                                    100,
                                    new DateTime(2024, 12, 12),
                                    [memberId],
                                    new DateTime(2024, 11, 12)))
                .WithCurrentDate(new DateTime(year, month, day))
                .WithMember(new Member(new MemberId(memberId), "username", 200, 1))
                .WhenExecuteHandler(new AnswerBetCommand(betId, true)))
                .ShouldNotSaveAnswer("time to answer is over");
    }

    [Fact]
    public async Task ShouldNotSaveAnswerWhenMemberDoesNotExist()
    {
        var betId = Guid.NewGuid();
        var memberId = Guid.NewGuid();
        (await new AnswerBetHandlerSut()
                .WithAuthenticatedUser(memberId)
                .WithBet(Bet.Create(new(betId),
                                    new MemberId(Guid.NewGuid()),
                                    "description",
                                    100,
                                    new DateTime(2024, 12, 12),
                                    [memberId],
                                    new DateTime(2024, 11, 12)))
                .WithCurrentDate(new DateTime(2024, 11, 12))
                .WhenExecuteHandler(new AnswerBetCommand(betId, true)))
                .ShouldNotSaveAnswer("member does not exist");
    }

    [Fact]
    public async Task ShouldNotSaveAnswerWhenMemberHasNotEnoughCoins()
    {
        var betId = Guid.NewGuid();
        var memberId = Guid.NewGuid();
        (await new AnswerBetHandlerSut()
                .WithAuthenticatedUser(memberId)
                .WithMember(new Member(new MemberId(memberId), "username", 0, 1))
                .WithBet(Bet.Create(new(betId),
                                    new MemberId(Guid.NewGuid()),
                                    "description",
                                    100,
                                    new DateTime(2024, 12, 12),
                                    [memberId],
                                    new DateTime(2024, 11, 12)))
                .WithCurrentDate(new DateTime(2024, 11, 12))
                .WhenExecuteHandler(new AnswerBetCommand(betId, true)))
                .ShouldNotSaveAnswer("member has not enough coins");
    }
}