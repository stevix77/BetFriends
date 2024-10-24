﻿using BetFriends.Application.Features.CreateBet;
using BetFriends.Application.UnitTests.Implems;
using BetFriends.Application.UnitTests.SUTs;
using BetFriends.Domain.Members;
using BetFriends.Domain.Members.Exceptions;

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
                .ShouldNotCreateBet(typeof(CannotBetException), CannotBetException.ChipsNotEnough);
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
    public async Task ShouldNotCreateBetWithNoneChip()
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
}