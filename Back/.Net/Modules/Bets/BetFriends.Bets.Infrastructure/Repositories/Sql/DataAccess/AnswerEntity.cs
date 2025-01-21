using BetFriends.Bets.Domain.AnswerBets;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace BetFriends.Bets.Infrastructure.Repositories.Sql.DataAccess;

[Table("answers", Schema = "bet")]
public class AnswerEntity
{
    public AnswerEntity()
    {
        
    }
    public AnswerEntity(AnswerBet answerBet)
    {
        var snapshot = answerBet.Snapshot;
        BetId = snapshot.BetId;
        GamblerId = snapshot.MemberId;
        Answer = snapshot.Answer;
    }

    [Column("bet_id"), Required]
    public Guid BetId { get; init; }
    [Column("gambler_id"), Required]
    public Guid GamblerId { get; init; }
    [Column("answer", TypeName = "bit")]
    public bool Answer { get; set; }

    internal void Update(AnswerBetSnapshot snapshot)
    {
        Answer = snapshot.Answer;
    }
}
