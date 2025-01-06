using BetFriend.Domain.Friends;
using BetFriends.Domain.Features.RetrieveFriends;

namespace BetFriends.Infrastructure.Repository.Http;

internal class HttpFriendRepository(IHttpClientFactory httpClientFactory) : IFriendRepository
{
    private readonly HttpClient httpClient = httpClientFactory.CreateClient("bets");
    public async Task AddAsync(string id, CancellationToken cancellationToken)
    {
        var response = await httpClient.PostAsync($"/friendship/{id}", null);
        response.EnsureSuccessStatusCode();
    }

    public Task<IReadOnlyCollection<FriendDto>> GetFriendsAsync()
    {
        throw new NotImplementedException();
    }
}
