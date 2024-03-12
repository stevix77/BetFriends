using BetFriends.Domain.Features.CreateBet;
using BetFriends.Domain.UnitTests.Implems;
using BetFriends.Domain.UnitTests.SUTs;

namespace BetFriends.Domain.UnitTests;

public class CreateBetHandlerTest
{
    [Fact]
    public async Task ShouldCreateBetWhenCommandIsValid()
    {
        (await new CreateBetSut()
                .WithDateProvider(new StubDateTimeProvider(new DateTime(2024, 3, 1)))
                .WithRequest(new CreateBetRequest("description", new DateTime(2024, 3, 10), 20, ["FriendId1", "FriendId2"]))
                .WhenExecuteCommand())
                .ShouldCreateBet();
    }

    [Fact]
    public async Task ShouldNotCreateBetWhenEndDateIsInThePast()
    {
        (await new CreateBetSut()
                .WithDateProvider(new StubDateTimeProvider(new DateTime(2024, 4, 1)))
                .WithRequest(new CreateBetRequest("description", new DateTime(2024, 3, 10), 20, ["FriendId1", "FriendId2"]))
                .WhenExecuteCommand())
                .ShouldNotCreateBet();
    }

    [Fact]
    public async Task ShouldNotCreateBetWhenDescriptionIsEmpty()
    {
        (await new CreateBetSut()
                .WithDateProvider(new StubDateTimeProvider(new DateTime(2024, 3, 1)))
                .WithRequest(new CreateBetRequest(string.Empty, new DateTime(2024, 3, 10), 20, ["FriendId1", "FriendId2"]))
                .WhenExecuteCommand())
                .ShouldNotCreateBet();
    }

    [Fact]
    public async Task ShouldNotCreateBetWithoutFriend()
    {
        (await new CreateBetSut()
                .WithDateProvider(new StubDateTimeProvider(new DateTime(2024, 3, 1)))
                .WithRequest(new CreateBetRequest("description", new DateTime(2024, 3, 10), 20, []))
                .WhenExecuteCommand())
                .ShouldNotCreateBet();
    }

    [Fact]
    public async Task ShouldNotCreateBetWith0Coin()
    {
        (await new CreateBetSut()
                .WithDateProvider(new StubDateTimeProvider(new DateTime(2024, 3, 1)))
                .WithRequest(new CreateBetRequest("description", new DateTime(2024, 3, 10), 0, ["friendId"]))
                .WhenExecuteCommand())
                .ShouldNotCreateBet();
    }
}