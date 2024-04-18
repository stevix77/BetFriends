﻿using BetFriends.Domain.Members;

namespace BetFriends.Infrastructure.Repositories;

internal class FakeMemberRepository : IMemberRepository
{
    private readonly List<Member> members;
    public FakeMemberRepository()
    {
        members = new() 
        { 
            new Member(new MemberId(Guid.Parse("11111111-1111-1111-1111-111111111111")), "username", 2000, 3),
            new Member(new MemberId(Guid.Parse("adadadad-1111-6666-4444-edededededed")), "toto", 2000, 3),

        };
    }
    public Task<Member> GetByIdAsync(MemberId memberId)
    {
        return Task.FromResult(members.FirstOrDefault(x => x.MemberId == memberId))!;
    }
}
