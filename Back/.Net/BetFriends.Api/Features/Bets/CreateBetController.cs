using BetFriends.Application.Abstractions;
using BetFriends.Application.Features.CreateBet;
using Microsoft.AspNetCore.Http.HttpResults;
using Microsoft.AspNetCore.Mvc;

namespace BetFriends.Api.Features.Bets;

public class CreateBetController : Controller
{
    private readonly IBetModule betModule;
    private readonly CreateBetPresenter createBetPresenter;

    public CreateBetController(IBetModule betModule, CreateBetPresenter createBetPresenter)
    {
        this.betModule = betModule;
        this.createBetPresenter = createBetPresenter;
    }

    [HttpPost("bets")]
    public async Task<IActionResult> Create([FromBody] CreateBetInput createBetInput)
    {
        await betModule.ExecuteAsync(new CreateBetCommand(createBetInput.Description,
                                                          createBetInput.Chips,
                                                          createBetInput.EndDate,
                                                          createBetInput.Friends));
        return createBetPresenter.ViewModel;
    }
}

public class CreateBetPresenter : ICreateBetOutputPort
{
    public IActionResult ViewModel { get; private set; } = null!;

    public void ChipsMissing()
    {
        ViewModel = new BadRequestObjectResult("Cannot create bet with 0 chip");
    }

    public void EndDateIsTooOld()
    {
        ViewModel = new BadRequestObjectResult("End date is too old");
    }

    public void FriendsMissing()
    {
        ViewModel = new BadRequestObjectResult("Cannot create bet without friend selected");
    }

    public void MemberDoesNotExist(Guid userId)
    {
        ViewModel = new ForbidResult();
    }

    public void Present(CreateBetResponse createBetResponse)
    {
        ViewModel = new CreatedResult((string?)null, createBetResponse.BetId);
    }
}

public record CreateBetInput(string Description, int Chips, DateTime EndDate, IEnumerable<Guid> Friends);
