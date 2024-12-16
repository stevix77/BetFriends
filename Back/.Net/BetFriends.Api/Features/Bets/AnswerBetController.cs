using BetFriends.Bets.Application.Abstractions;
using BetFriends.Bets.Application.Features.AnswerBet;
using Microsoft.AspNetCore.Mvc;

namespace BetFriends.Api.Features.Bets;

public class AnswerBetController : Controller
{
    private readonly IBetModule betModule;
    private readonly AnswerBetPresenter answerBetPresenter;

    public AnswerBetController(IBetModule betModule, AnswerBetPresenter answerBetPresenter)
    {
        this.betModule = betModule;
        this.answerBetPresenter = answerBetPresenter;
    }

    [HttpPost("bets/{betId:guid}/answer")]
    public async Task<IActionResult> Create([FromBody] AnswerBetInput answerBetInput, Guid betId)
    {
        await betModule.ExecuteAsync(new AnswerBetCommand(betId, answerBetInput.Answer));
        return answerBetPresenter.ViewModel;
    }
}

public class AnswerBetPresenter : IAnswerBetOutputPort
{
    public IActionResult ViewModel { get; private set; } = null!;

    public void BetDoesNotExist()
    {
        ViewModel = new BadRequestObjectResult("Bet does not exist");
    }

    public void MemberDoesNotExist()
    {
        ViewModel = new BadRequestObjectResult("Member does not exist");
    }

    public void MemberHasNotEnoughCoins()
    {
        ViewModel = new BadRequestObjectResult("Member has not enough coins to answer");
    }

    public void MemberIsNotAuthorized()
    {
        ViewModel = new BadRequestObjectResult("Member is not requested to answer this bet");
    }

    public void Success()
    {
        ViewModel = new OkResult();
    }

    public void TimeToAnswerIsOver()
    {
        ViewModel = new BadRequestObjectResult("Time To answer is over");
    }
}

public record AnswerBetInput(bool Answer);
