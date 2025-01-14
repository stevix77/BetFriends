﻿using BetFriends.Bets.Domain.Members.Exceptions;

namespace BetFriends.Bets.Domain.Members.Services;

public sealed class DecreaseCoinsMember(IMemberRepository repository)
{
    private readonly IMemberRepository repository = repository;

    public async Task Decrease(MemberId memberId, int coins)
    {
        var member = await repository.GetByIdAsync(memberId) ?? throw new MemberDoesNotExistException();
        member.DecreaseBalance(coins);
        await repository.SaveAsync(member);
    }
}
