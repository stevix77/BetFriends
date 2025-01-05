using BetFriends.Bets.Application.Abstractions;
using BetFriends.Bets.Application.Features.MemberInfo;
using Microsoft.AspNetCore.Mvc;
using Swashbuckle.AspNetCore.Annotations;

namespace BetFriends.Api.Features.Bets;

[Route("me")]
public class MemberInfoController(IBetModule betModule) : Controller
{
    [SwaggerOperation(Tags = new[] { "Bets" })]
    [HttpGet]
    public async Task<IActionResult> GetInfoAsync()
    {
        var info = await betModule.ExecuteAsync(new GetMemberInfoQuery());
        return Ok(info);
    }
}
