using BetFriends.Bets.Application.Features.CreateBet;
using BetFriends.Bets.Application.UnitTests.Implems;
using BetFriends.Bets.Application.UnitTests.SUTs;
using BetFriends.Bets.Domain.Members;
using BetFriends.Bets.Domain.Members.Exceptions;

namespace BetFriends.Application.UnitTests.Features;

public class CreateBetHandlerTest
{
    [Fact]
    public async Task ShouldCreateBetWhenRequestIsValid()
    {
        var userId = Guid.NewGuid();
        (await new CreateBetHandlerSut()
                    .WithBetId(Guid.NewGuid())
                    .WithUserId(userId)
                    .WithMember(new Member(new MemberId(userId), "username", 1000, 1))
                    .WithCommand(new CreateBetCommand("description",
                                                        300,
                                                        new DateTime(2024, 4, 23),
                                                        [Guid.Parse("aaaaaaaa-aaaa-aaaa-aaaa-aaaaaaaaaaaa")]))
                    .WhenExecuteCommand())
                    .ShouldCreateBet();
    }

    [Fact]
    public async Task ShouldNotCreateBetWhenMemberIsUnknown()
    {
        (await new CreateBetHandlerSut()
                .WithUserId(Guid.NewGuid())
                .WithCommand(new CreateBetCommand("description",
                                                300,
                                                new DateTime(2024, 4, 23),
                                                [Guid.Parse("aaaaaaaa-aaaa-aaaa-aaaa-aaaaaaaaaaaa")]))
                .WhenExecuteCommand())
                .ShouldNotCreateBet(MockCreateBetPresenter.MemberDoesNotExistMessage);
    }

    [Fact]
    public async Task ShouldNotCreateBetWhenMemberHasNotEnoughChips()
    {
        var userId = Guid.NewGuid();
        var member = new Member(new MemberId(userId), "username", 100, 1);
        (await new CreateBetHandlerSut()
                .WithUserId(userId)
                .WithMember(member)
                .WithCommand(new CreateBetCommand("description",
                                                300,
                                                new DateTime(2024, 4, 23),
                                                [Guid.Parse("aaaaaaaa-aaaa-aaaa-aaaa-aaaaaaaaaaaa")]))
                .WhenExecuteCommand())
                .ShouldNotCreateBet(typeof(CannotBetException), CannotBetException.CoinsNotEnough);
    }

    [Fact]
    public async Task ShouldNotCreateBetWhenEndDateIsTooOld()
    {
        var userId = Guid.NewGuid();
        var member = new Member(new MemberId(userId), "username", 1000, 1);
        (await new CreateBetHandlerSut()
                .WithUserId(userId)
                .WithMember(member)
                .WithCurrentDate(new DateTime(2025, 5, 5))
                .WithCommand(new CreateBetCommand("description",
                                                300,
                                                new DateTime(2024, 4, 23),
                                                [Guid.Parse("aaaaaaaa-aaaa-aaaa-aaaa-aaaaaaaaaaaa")]))
                .WhenExecuteCommand())
                .ShouldNotCreateBet(MockCreateBetPresenter.EndDateTooOldMessage);
    }

    [Fact]
    public async Task ShouldNotCreateFreeBet()
    {
        var userId = Guid.NewGuid();
        var member = new Member(new MemberId(userId), "username", 1000, 1);
        (await new CreateBetHandlerSut()
                .WithUserId(userId)
                .WithMember(member)
                .WithCurrentDate(new DateTime(2023, 5, 5))
                .WithCommand(new CreateBetCommand("description",
                                                0,
                                                new DateTime(2024, 4, 23),
                                                [Guid.Parse("aaaaaaaa-aaaa-aaaa-aaaa-aaaaaaaaaaaa")]))
                .WhenExecuteCommand())
                .ShouldNotCreateBet(MockCreateBetPresenter.NoneChip);
    }

    [Fact]
    public async Task ShouldNotCreateBetWhenMemberHasNoFriend()
    {
        var userId = Guid.NewGuid();
        var member = new Member(new MemberId(userId), "username", 1000, 0);
        (await new CreateBetHandlerSut()
                .WithUserId(userId)
                .WithMember(member)
                .WithCurrentDate(new DateTime(2023, 5, 5))
                .WithCommand(new CreateBetCommand("description",
                                                120,
                                                new DateTime(2024, 4, 23),
                                                [Guid.Parse("aaaaaaaa-aaaa-aaaa-aaaa-aaaaaaaaaaaa")]))
                .WhenExecuteCommand())
                .ShouldNotCreateBet(typeof(CannotBetException), CannotBetException.NoneFriends);
    }

    [Fact]
    public async Task ShouldNotCreateBetAlone()
    {
        var userId = Guid.NewGuid();
        var member = new Member(new MemberId(userId), "username", 1000, 5);
        (await new CreateBetHandlerSut()
                .WithUserId(userId)
                .WithMember(member)
                .WithCurrentDate(new DateTime(2023, 5, 5))
                .WithCommand(new CreateBetCommand("description",
                                                120,
                                                new DateTime(2024, 4, 23),
                                                []))
                .WhenExecuteCommand())
                .ShouldNotCreateBet(MockCreateBetPresenter.NoneFriends);
    }
}