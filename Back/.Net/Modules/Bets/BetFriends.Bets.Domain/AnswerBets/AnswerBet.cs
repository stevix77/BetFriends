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

    public AnswerBet(BetId betId, bool answer, MemberId memberId)
    {
        this.betId = betId;
        this.answer = answer;
        this.memberId = memberId;
        AddEvent(new BetAnswered(betId, answer, memberId));
    }

    public AnswerBetState State { get => new AnswerBetState(betId, memberId, answer); }

    public bool HasAccepted()
        => answer;
}
