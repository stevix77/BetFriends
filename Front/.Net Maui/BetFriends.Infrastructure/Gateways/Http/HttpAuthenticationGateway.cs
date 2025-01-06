using BetFriends.Domain.Abstractions;
using System.Net.Http.Json;
using System.Text.Json;

namespace BetFriends.Infrastructure.Gateways.Http;

internal class HttpAuthenticationGateway(IHttpClientFactory httpClientFactory) : IAuthenticationGateway
{
    private readonly HttpClient httpClient = httpClientFactory.CreateClient("authentication");
    public async Task<AuthToken> AuthenticateAsync(string email, string password)
    {
        try
        {
            var response = await httpClient.PostAsJsonAsync("/auth", new { email, password });
            response.EnsureSuccessStatusCode();
            var jsonContent = await response.Content.ReadAsStringAsync();
            return JsonSerializer.Deserialize<AuthToken>(jsonContent)!;
        }
        catch (Exception)
        {
            return default!;
        }
    }
}
