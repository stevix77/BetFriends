using BetFriends.Bets.Domain.Bets;
using BetFriends.Bets.Domain.Events;
using BetFriends.Bets.Domain.Members;
using BetFriends.Shared.Domain;

namespace BetFriends.Bets.Domain.AnswerBets;

public class AnswerBet : Entity
{
    private readonly BetId betId;
    private readonly bool answer;
    private readonly MemberId memberId;

    private AnswerBet(AnswerBetSnapshot snapshot)
    {
        betId = new(snapshot.BetId);
        answer = snapshot.Answer;
        memberId = new(snapshot.MemberId);
    }

    public AnswerBet(BetId betId, bool answer, MemberId memberId)
    {
        this.betId = betId;
        this.answer = answer;
        this.memberId = memberId;
        AddEvent(new BetAnswered(betId, answer, memberId));
    }

    public AnswerBetSnapshot Snapshot { get => new AnswerBetSnapshot(betId.Value, memberId.Value, answer); }

    public static AnswerBet FromSnapshot(AnswerBetSnapshot snapshot)
    {
        return new AnswerBet(snapshot);
    }

    public bool HasAccepted()
        => answer;
}
