using BetFriends.Domain.Bets;
using BetFriends.Domain.Features.CreateBet;
using BetFriends.Domain.Features.RetrieveBets;
using System.Net.Http.Json;

namespace BetFriends.Infrastructure.Repository.Http;

internal class HttpBetRepository(IHttpClientFactory httpClientFactory) : IBetRepository
{
    private readonly HttpClient httpClient = httpClientFactory.CreateClient("bets");
    public async Task AnswerBetAsync(string betId, bool answer)
    {
        var response = await httpClient.PostAsJsonAsync($"/bets/{betId}/answer", new
        {
            answer
        });
        response.EnsureSuccessStatusCode();
    }

    public async Task CompleteBetAsync(string betId, bool isSuccess, string? proof, CancellationToken cancellationToken)
    {
        var response = await httpClient.PostAsJsonAsync($"/bets/{betId}/complete", new
        {
            isSuccessful = isSuccess,
            proof
        });
        response.EnsureSuccessStatusCode();
    }

    public Task<IEnumerable<RetrieveBetsItemResponse>> RetrieveBetsAsync()
    {
        return httpClient.GetFromJsonAsync<IEnumerable<RetrieveBetsItemResponse>>("/bets")!;
    }

    public Task<byte[]> RetrieveProofAsync(string betId)
    {
        throw new NotImplementedException();
    }

    public async Task SaveAsync(Bet bet, CancellationToken cancellationToken)
    {
        var response = await httpClient.PostAsJsonAsync($"/bets", new
        {
            bet.EndDate,
            bet.Friends,
            bet.Description,
            bet.Id,
            bet.Coins
        });
        response.EnsureSuccessStatusCode();
    }
}
