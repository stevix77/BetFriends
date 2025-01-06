using BetFriends.Domain.Abstractions;
using BetFriends.Domain.Features.RetrieveInfo;
using BetFriends.Domain.Features.RetrieveMembers;
using System.Text.Json;

namespace BetFriends.Infrastructure.Repository.Http;

internal class HttpMemberRepository(IHttpClientFactory httpClientFactory) : IMemberRepository
{
    private readonly HttpClient httpClient = httpClientFactory.CreateClient("bets");
    public async Task<RetrieveInfoResponse> RetrieveInfoAsync()
    {
        var response = await httpClient.GetAsync("/me");
        response.EnsureSuccessStatusCode();
        var jsonContent = await response.Content.ReadAsStringAsync();
        return JsonSerializer.Deserialize<RetrieveInfoResponse>(jsonContent)!;
    }

    public Task<IReadOnlyCollection<MemberDto>> RetrieveMembersByKeyword(string searchTerm)
    {
        throw new NotImplementedException();
    }
}
