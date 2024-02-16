
using BetFriend.Domain.Features.AddFriend;
using BetFriend.Domain.UnitTests.Implems;

namespace BetFriend.Domain.UnitTests;

public class AddFriendHandlerTest
{
    [Fact]
    public async Task ShouldAddFriend()
    {
        var request = new AddFriendRequest("id");
        var repository = new FakeFriendRepository();
        var presenter = new StubAddFriendPresenter();
        var handler = new AddFriendRequestHandler(repository, presenter);
        await handler.Handle(request, new CancellationToken());
        Assert.Contains(repository.Friends, x => x == "id");
        Assert.True(presenter.Added);
    }
}