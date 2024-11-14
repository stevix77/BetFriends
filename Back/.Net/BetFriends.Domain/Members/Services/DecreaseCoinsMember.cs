using BetFriends.Domain.Members.Exceptions;

namespace BetFriends.Domain.Members.Services;

public sealed class DecreaseCoinsMember(IMemberRepository repository)
{
    private readonly IMemberRepository repository = repository;

    public async Task Decrease(MemberId memberId, int coins)
    {
        var member = await repository.GetByIdAsync(memberId) ?? throw new MemberDoesNotExistException();
        member.Decrease(coins);
        await repository.SaveAsync(member);
    }
}
