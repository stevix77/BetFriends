using BetFriends.Bets.Domain.Bets;
using BetFriends.Bets.Domain.Members;

namespace BetFriends.Bets.Domain.AnswerBets
{
    public record AnswerBetState(BetId BetId, MemberId MemberId, bool Answer);
}