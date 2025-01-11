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

    [Column("bet_id"), Key, Required]
    public Guid BetId { get; init; }
    [Column("gambler_id"), Key, Required]
    public Guid GamblerId { get; init; }
    [Column("answer", TypeName = "bit"), Required]
    public bool Answer { get; set; }
    [Column("upserted_date", TypeName = "datetime")]
    public DateTime UpsertedDate{ get; init; }

    internal void Update(AnswerBetSnapshot snapshot)
    {
        Answer = snapshot.Answer;
    }
}
