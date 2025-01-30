using BetFriends.Users.Application.Abstractions;
using BetFriends.Users.Application.Features.SignIn;
using Microsoft.AspNetCore.Mvc;
using Swashbuckle.AspNetCore.Annotations;

namespace BetFriends.Api.Features.Authentication;

[Route("auth")]
public class SignInController(IUserModule userModule) : Controller
{
    private readonly IUserModule userModule = userModule;

    [SwaggerOperation(Tags = new[] { "Authentication" })]
    [HttpPost]
    public async Task<IActionResult> SignInAsync([FromBody] SignInRequest signInRequest)
    {
        var request = new SignInQuery(signInRequest.Email, signInRequest.Password);
        var authentication = await userModule.ExecuteAsync(request);
        if(authentication != null)
            return Ok(authentication);
        return BadRequest("Erreur d'authentification");
    }
}

public record SignInRequest(string Email, string Password);