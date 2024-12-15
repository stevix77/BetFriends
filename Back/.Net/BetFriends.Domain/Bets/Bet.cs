using BetFriends.Domain.AnswerBets;
using BetFriends.Domain.Bets.Exceptions;
using BetFriends.Domain.Events;
using BetFriends.Domain.Members;
using BetFriends.Shared.Domain;

namespace BetFriends.Domain.Bets;

public class Bet : Entity
{
    private Bet(Guid id, Guid ownerId, string description, int coins, DateTime endDate, IEnumerable<Guid> guests)
    {
        BetId = new(id);
        BookieId = new(ownerId);
        Description = description;
        Coins = coins;
        EndDate = endDate;
        Guests = guests;
    }

    private Bet(BetId betId,
                MemberId ownerId,
                string description,
                int coins,
                DateTime endDate,
                IEnumerable<Guid> friends,
                MaxAnswerDate maxAnswerDate)
    {
        BetId = betId;
        BookieId = ownerId;
        Description = description;
        Coins = coins;
        EndDate = endDate;
        Guests = friends;
        MaxAnswerDate = maxAnswerDate;
        AddEvent(new BetCreated(betId, ownerId, coins));
    }

    public DateTime EndDate { get; }
    public string Description { get; }
    public int Coins { get; }
    public BetId BetId { get; }
    public IEnumerable<Guid> Guests { get; }
    public MaxAnswerDate MaxAnswerDate { get; }
    public MemberId BookieId { get; }
    public bool? IsSuccessful { get; private set; }
    public string? Proof { get; private set; }

    public static Bet Create(BetId betId,
                             MemberId ownerId,
                             string description,
                             int coins,
                             DateTime endDate,
                             IEnumerable<Guid> friends,
                             DateTime creationDate)
    {
        var maxAnswerDate = new MaxAnswerDate(creationDate, endDate);
        return new Bet(betId, ownerId, description, coins, endDate, friends, maxAnswerDate);
    }

    public static Bet CreateFromEntity(Guid id, Guid ownerId, string description, int coins, DateTime endDate, string friends)
    {
        return new Bet(id,
                       ownerId,
                       description,
                       coins,
                       endDate,
                       friends.Split(';').Select(Guid.Parse));
    }

    public (AnswerBet AnswerBet, AnswerErrorCode? Error) AddAnswer(Member member, bool answer, DateTime currentDate)
    {
        if (IsNotRequested(member))
            return (null!, AnswerErrorCode.NotRequested);
        if (IsTimeToAnswerIsOver(currentDate))
            return (null!, AnswerErrorCode.TimeToAnswerOver);
        if (!member.CanBet(Coins))
            return (null!, AnswerErrorCode.NotEnoughCoins);
        return (new AnswerBet(BetId, answer, member.MemberId), null!);
    }

    public void Close(bool isSuccessful, Guid bookieId, string? proof)
    {
        if (bookieId != BookieId.Value)
            throw new BookieCompleteException($"bookie {bookieId} is not the bet owner");
        if (isSuccessful && string.IsNullOrWhiteSpace(proof))
            throw new ProofRequiredException();
        IsSuccessful = isSuccessful;
        Proof = proof;
        AddEvent(new BetCompleted(BetId, isSuccessful));
    }

    private bool IsNotRequested(Member member)
        => Guests.All(x => x != member.MemberId.Value);

    private bool IsTimeToAnswerIsOver(DateTime currentDate)
        => MaxAnswerDate.Value.CompareTo(currentDate) <= 0;
}

public enum AnswerErrorCode
{
    NotRequested,
    TimeToAnswerOver,
    NotEnoughCoins
}