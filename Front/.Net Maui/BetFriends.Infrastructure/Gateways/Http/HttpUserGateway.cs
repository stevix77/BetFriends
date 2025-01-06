using BetFriends.Domain.Abstractions;
using System.Net.Http.Json;

namespace BetFriends.Infrastructure.Gateways.Http;

internal class HttpUserGateway(IHttpClientFactory httpClientFactory) : IUserGateway
{
    private readonly HttpClient httpClient = httpClientFactory.CreateClient("authentication");
    public async Task SaveAsync(User user)
    {
        var response = await httpClient.PostAsJsonAsync("/users", new
        {
            user.Username,
            user.Email,
            user.Id,
            user.Password
        });
        response.EnsureSuccessStatusCode();
    }
}
