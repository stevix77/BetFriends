
using BetFriends.Domain.Bets;
using BetFriends.Domain.Events;
using BetFriends.Domain.Members;

namespace BetFriends.Domain.AnswerBets;

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
}
