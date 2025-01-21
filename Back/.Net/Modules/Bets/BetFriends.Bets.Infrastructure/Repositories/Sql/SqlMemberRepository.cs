using BetFriends.Bets.Domain.Members;
using BetFriends.Bets.Infrastructure.Repositories.Sql.DataAccess;
using BetFriends.Shared.Infrastructure.Event;
using Microsoft.EntityFrameworkCore;

namespace BetFriends.Bets.Infrastructure.Repositories.Sql;

internal class SqlMemberRepository(BetContext betContext, DomainEventsAccessor domainEventsAccessor) : IMemberRepository
{
    private readonly BetContext betContext = betContext;
    private readonly DomainEventsAccessor domainEventsAccessor = domainEventsAccessor;

    public async Task<Member> GetByIdAsync(MemberId memberId)
    {
        var entity = await betContext.Members.FindAsync(memberId.Value);
        if (entity != null)
            return Member.FromState(new MemberState(entity.MemberId,
                                                    entity.Username,
                                                    entity.Wallet,
                                                    entity.CountFriends));
        return default!;
    }

    public async Task<IEnumerable<Member>> GetByIdsAsync(IEnumerable<Guid> guests)
    {
        var members = await betContext.Members.Where(x => guests.Contains(x.MemberId)).ToListAsync();
        return members.Select(x => Member.FromState(new MemberState(x.MemberId,
                                                                    x.Username,
                                                                    x.Wallet,
                                                                    x.CountFriends)));
    }

    public async Task<bool> IsMemberExistAsync(MemberId memberId)
    {
        return (await betContext.Members.CountAsync(x => x.MemberId == memberId.Value)) != 0;
    }

    public async Task SaveAsync(Member member)
    {
        var entity = await betContext.Members.FindAsync(member.MemberId.Value);
        if (entity == null)
        {
            await betContext.Members.AddAsync(new MemberEntity(member));
            return;
        }
        entity.Update(member.Snapshot);
        domainEventsAccessor.Add(member.Events);
    }

    public async Task SaveAsync(IEnumerable<Member> gamblers)
    {
        var entities = await betContext.Members
                                     .Where(x => gamblers.Any(g => g.Snapshot.MemberId == x.MemberId))
                                     .ToListAsync();
        foreach (var entity in entities)
        {
            var gambler = gamblers.FirstOrDefault(x => x.Snapshot.MemberId == entity.MemberId);
            if (gambler != null)
                entity.Update(gambler.Snapshot);
        }
    }
}
