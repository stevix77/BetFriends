using BetFriends.Bets.Application.Abstractions;
using BetFriends.Bets.Application.Features.AddFriend;
using Microsoft.AspNetCore.Mvc;
using Swashbuckle.AspNetCore.Annotations;

namespace BetFriends.Api.Features.Friendship
{
    [Route("friendship")]
    public class AddFriendshipController(IBetModule module, AddFriendshipPresenter presenter) : Controller
    {
        [SwaggerOperation(Tags = new[] { "Friendship" })]
        [HttpPost("{memberId}")]
        public async Task<IActionResult> AddFriendship(Guid memberId)
        {
            await module.ExecuteAsync(new AddFriendRequest(memberId));
            return presenter.Result;
        }
    }

    public class AddFriendshipPresenter : IAddFriendOutputPort
    {
        public IActionResult Result { get; private set; }

        public void MemberDoesNotExist()
        {
            Result = new BadRequestObjectResult("Member does not exist");
        }

        public void Present()
        {
            Result = new OkResult();
        }
    }
}
