﻿using BetFriends.Bets.Application.Features.CreateBet;
using BetFriends.Bets.Application.UnitTests.Implems;
using BetFriends.Bets.Domain.Members;
using BetFriends.Bets.Domain.Members.Exceptions;

namespace BetFriends.Bets.Application.UnitTests.Features;

public class BetCreatedNotificationHandlerTest
{
    [Fact]
    public async Task ShouldDecreaseChipsWhenMemberBet()
    {
        var memberId = Guid.NewGuid();
        var member = Member.FromState(new MemberState(memberId, "username", 3000, 3));
        var repository = new StubMemberRepository(member);
        var command = new BetCreatedNotification(default!, new(memberId), 300);
        var handler = new BetCreatedNotificationHandler(new Domain.Members.Services.DecreaseCoinsMember(repository));
        await handler.Handle(command, default!);
        Assert.Equal(new MemberState(memberId, "username", 2700, 3), member.Snapshot);
    }

    [Fact]
    public async Task ShouldNotDecreaseWhenMemberDoesNotExist()
    {
        var memberId = Guid.NewGuid();
        var member = Member.FromState(new MemberState(Guid.NewGuid(), "username", 3000, 3));
        var repository = new StubMemberRepository(member);
        var command = new BetCreatedNotification(default!, new(memberId), 300);
        var handler = new BetCreatedNotificationHandler(new Domain.Members.Services.DecreaseCoinsMember(repository));
        var record = await Record.ExceptionAsync(() => handler.Handle(command, default!));
        Assert.IsType<MemberDoesNotExistException>(record);
    }
}