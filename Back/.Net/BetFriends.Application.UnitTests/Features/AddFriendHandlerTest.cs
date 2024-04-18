﻿using BetFriends.Application.UnitTests.SUTs;
using BetFriends.Domain.Members;

namespace BetFriends.Application.UnitTests.Features;

public class AddFriendHandlerTest
{
    [Fact]
    public async Task ShouldAddFriendWhenMemberKnown()
    {
        var memberId = Guid.NewGuid();
        (await new AddFriendHandlerSut(Guid.NewGuid())
                        .WithMember(new Member(new(memberId), "username", 1000, 2))
                        .WhenExecuteHandle(memberId))
                        .ThenShouldCreateFriendship(memberId);
    }

    [Fact]
    public async Task ShouldNotAddFriendWhenMemberDoesNotExist()
    {
        var memberId = Guid.NewGuid();
        (await new AddFriendHandlerSut(Guid.NewGuid())
                        .WithMember(new Member(new(Guid.NewGuid()), "username", 1000, 2))
                        .WhenExecuteHandle(memberId))
                        .ThenShouldNotCreateFriendship(memberId);
    }
}