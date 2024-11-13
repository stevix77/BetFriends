namespace BetFriends.Domain.AnswerBets;

public interface IAnswerBetRepository
{
    Task SaveAsync(AnswerBet answerBet);
}
