using BetFriends.Domain.Bets;
using BetFriends.Domain.Members;

namespace BetFriends.Domain.AnswerBets
{
    public record AnswerBetState(BetId BetId, MemberId MemberId, bool Answer);
}