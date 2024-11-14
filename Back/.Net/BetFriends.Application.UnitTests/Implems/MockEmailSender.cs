using BetFriends.Application.Features.CreateBet;
using BetFriends.Domain.Members;

namespace BetFriends.Application.UnitTests.Implems;

internal class MockEmailSender : INotifier
{
    public List<Member> Members { get; } = new List<Member>();

    public Task Notify(IEnumerable<Member> guests)
    {
        Members.AddRange(guests);
        return Task.CompletedTask;
    }
}
