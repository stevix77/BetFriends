using BetFriends.Users.Application.Abstractions;
using BetFriends.Users.Application.Features.Register;
using Microsoft.AspNetCore.Mvc;
using Swashbuckle.AspNetCore.Annotations;

namespace BetFriends.Api.Features.Users;

public class UserRegisterController(IUserModule userModule,
                                    RegisterPresenter registerPresenter) : Controller
{
    private readonly IUserModule userModule = userModule;

    [SwaggerOperation(Tags = new[] { "Users" })]
    [HttpPost("users")]
    public async Task<IActionResult> RegisterAsync([FromBody] RegisterInput registerInput)
    {
        var command = new RegisterCommand(registerInput.Username,
                                          registerInput.Email,
                                          registerInput.Password,
                                          registerPresenter);
        await userModule.ExecuteAsync(command);
        return registerPresenter.ViewModel;
    }
}

public record RegisterInput(string Username, string Email, string Password);

public class RegisterPresenter : IRegisterOutputPort
{
    internal IActionResult ViewModel { get; private set; }
    public void Present(RegisterResponse registerResponse)
    {
        ViewModel = new OkObjectResult(registerResponse.UserId);
    }

    public void UserAlreadyExist()
    {
        ViewModel = new BadRequestObjectResult("User already exist");
    }
}
