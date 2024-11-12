

using BetFriends.Application.Features.AnswerBet;
using BetFriends.Application.UnitTests.Implems;
using BetFriends.Application.UnitTests.SUTs;
using BetFriends.Domain.AnswerBets;
using BetFriends.Domain.Bets;
using System.Collections;

namespace BetFriends.Application.UnitTests.Features;

/// <summary>
/// not connected
/// not authorized
/// bookie is the user
/// not enough coins
/// max answer date over
/// </summary>
public class AnswerBetHandlerTest
{
    [Fact]
    public async Task ShouldSaveAnAnswer()
    {
        var betId = Guid.NewGuid();
        (await new AnswerBetHandlerSut(betId)
                .WithBet(Bet.Create(new(betId),
                                    new Domain.Members.MemberId(Guid.NewGuid()),
                                    "description",
                                    100,
                                    new DateTime(2024, 12, 12),
                                    [Guid.NewGuid()]))
                .WhenExecuteHandler(new AnswerBetCommand(betId, true)))
                .ShouldSaveAnswer();
    }

    [Fact]
    public async Task ShouldNotSaveAnswerWhenBetDoesNotExist()
    {
        var betId = Guid.NewGuid();
        (await new AnswerBetHandlerSut(betId)
                .WhenExecuteHandler(new AnswerBetCommand(betId, true)))
                .ShouldNotSaveAnswer("bet does not exist");
    }

    //[Fact]
    //public async Task ShouldNotSaveAnswerWhen
}