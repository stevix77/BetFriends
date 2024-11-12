
using BetFriends.Domain.Bets;

namespace BetFriends.Domain.AnswerBets;

public class AnswerBet : Entity
{
    private readonly BetId betId;
    private readonly bool answer;

    public AnswerBet(BetId betId, bool answer)
    {
        this.betId = betId;
        this.answer = answer;
    }
}
