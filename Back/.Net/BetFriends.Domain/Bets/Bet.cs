using BetFriends.Domain.Events;
using BetFriends.Domain.Members;

namespace BetFriends.Domain.Bets;

public class Bet : Entity
{
    private Bet(Guid id, Guid ownerId, string description, int chips, DateTime endDate, IEnumerable<Guid> guests)
    {
        BetId = new(id);
        OwnerId = new(ownerId);
        Description = description;
        Chips = chips;
        EndDate = endDate;
        Guests = guests;
    }

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

    public static Bet CreateFromEntity(Guid id, Guid ownerId, string description, int chips, DateTime endDate, string friends)
    {
        return new Bet(id,
                       ownerId,
                       description,
                       chips,
                       endDate,
                       friends.Split(';').Select(Guid.Parse));
    }
}
