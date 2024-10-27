using BetFriends.Application.Abstractions;
using BetFriends.Application.Features.RetrieveBets;
using Microsoft.AspNetCore.Mvc;

namespace BetFriends.Api.Features.Bets
{
    public class RetrieveBetsController(IBetModule betModule) : Controller
    {
        private readonly IBetModule betModule = betModule;

        [HttpGet("bets")]
        public async Task<IActionResult> RetrieveBetsAsync()
        {
            var bets = await betModule.ExecuteAsync(new RetrieveBetsQuery());
            return Ok(bets);
        }
    }
}
