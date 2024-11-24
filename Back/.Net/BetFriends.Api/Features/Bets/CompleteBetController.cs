using BetFriends.Application.Abstractions;
using BetFriends.Application.Features.CompleteBet;
using BetFriends.Domain.Bets.Exceptions;
using Microsoft.AspNetCore.Mvc;

namespace BetFriends.Api.Features.Bets;

public class CompleteBetController : Controller
{
    private readonly IBetModule betModule;
    private readonly CompleteBetPresenter completeBetPresenter;
    private readonly ILogger<CompleteBetController> logger;

    public CompleteBetController(IBetModule betModule,
                                 CompleteBetPresenter completeBetPresenter,
                                 ILogger<CompleteBetController> logger)
    {
        this.betModule = betModule;
        this.completeBetPresenter = completeBetPresenter;
        this.logger = logger;
    }

    [HttpPost("bets/{betId:guid}/complete")]
    public async Task<IActionResult> Complete([FromBody] CompleteBetInput completeBetInput, Guid betId)
    {
        try
        {
            await betModule.ExecuteAsync(new CompleteBetCommand(betId, completeBetInput.IsSuccessful, completeBetInput.Proof));
        }
        catch (BookieCompleteException bex)
        {
            completeBetPresenter.BookieError(bex.Message);
        }
        catch(ProofRequiredException prex)
        {
            completeBetPresenter.ProofRequired(prex.Message);
        }
        return completeBetPresenter.ViewModel;
    }
}

public class CompleteBetPresenter : ICompleteBetOutputPort
{
    public IActionResult ViewModel { get; private set; } = null!;

    public void BetDoesNotExist(Guid betId)
    {
        ViewModel = new NotFoundObjectResult(betId);
    }

    public void Success(CompleteBetResponse completeBetResponse)
    {
        ViewModel = new OkResult();
    }

    internal void BookieError(string message)
    {
        ViewModel = new BadRequestObjectResult(message);
    }

    internal void ProofRequired(string message)
    {
        ViewModel = new BadRequestObjectResult(message);
    }
}

public record CompleteBetInput(bool IsSuccessful, string? Proof);
