using BetFriends.Api.Features.Authentication;
using BetFriends.Api.Features.Users;
using System.Net.Http.Json;
using System.Text.Json;

namespace BetFriends.Users.E2ETests;

public class UserModuleTest(BetFriendsWebApplicationFactory<Program> betFriendsWebApplicationFactory)
    : IClassFixture<BetFriendsWebApplicationFactory<Program>>
{
    private readonly HttpClient httpClient = betFriendsWebApplicationFactory.CreateClient();

    [Fact]
    public async Task ShouldCreateUserWhenInputIsCorrect()
    {
        var input = new RegisterInput("username", "email", "password");
        var response = await httpClient.PostAsJsonAsync("users", input);
        var data = await response.Content.ReadAsStringAsync();
        var userId = JsonSerializer.Deserialize<Guid>(data);
        Assert.True(response.IsSuccessStatusCode);
        Assert.NotEqual(Guid.Empty, userId);
    }

    [Fact]
    public async Task ShouldNotAuthenticateWhenUserIsUnknown()
    {
        var input = new SignInRequest(string.Empty, string.Empty);
        var response = await httpClient.PostAsJsonAsync("auth", input);
        Assert.Equal(400, (int)response.StatusCode);
    }
}