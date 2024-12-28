using BetFriends.Bets.Application.Abstractions;
using BetFriends.Bets.Application.Features.RetrieveBets;
using Microsoft.AspNetCore.Mvc;
using Swashbuckle.AspNetCore.Annotations;

namespace BetFriends.Api.Features.Bets
{
    public class RetrieveBetsController(IBetModule betModule) : Controller
    {
        private readonly IBetModule betModule = betModule;

        [SwaggerOperation(Tags = new[] { "Bets" })]
        [HttpGet("bets")]
        public async Task<IActionResult> RetrieveBetsAsync()
        {
            var bets = await betModule.ExecuteAsync(new RetrieveBetsQuery());
            return Ok(bets);
        }
    }
}
