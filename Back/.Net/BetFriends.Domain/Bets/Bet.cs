using BetFriends.Domain.Events;
using BetFriends.Domain.Members;

namespace BetFriends.Domain.Bets;

public class Bet : Entity
{
    private Bet(BetId betId,
                MemberId ownerId,
                string description,
                int chips,
                DateTime endDate,
                IEnumerable<Guid> friends)
    {
        BetId = betId;
        OwnerId = ownerId;
        Description = description;
        Chips = chips;
        EndDate = endDate;
        Guests = friends;
        AddEvent(new BetCreated(betId, ownerId, chips));
    }

    public DateTime EndDate { get; }
    public string Description { get; }
    public int Chips { get; }
    public BetId BetId { get; }
    public IEnumerable<Guid> Guests { get; }
    public MemberId OwnerId { get; }

    public static Bet Create(BetId betId,
                             MemberId ownerId,
                             string description,
                             int chips,
                             DateTime endDate,
                             IEnumerable<Guid> friends)
    {
        return new Bet(betId, ownerId, description, chips, endDate, friends);
    }
}
