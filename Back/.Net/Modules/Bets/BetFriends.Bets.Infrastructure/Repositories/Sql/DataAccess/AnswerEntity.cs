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
        MemberId = snapshot.MemberId;
        Answer = snapshot.Answer;
    }

    [Column("bet_id"), Key, Required]
    public Guid BetId { get; init; }
    [Column("member_id"), Key, Required]
    public Guid MemberId { get; init; }
    [Column("answer", TypeName = "bit"), Required]
    public bool Answer { get; init; }
    [Column("upsert_date", TypeName = "datetime")]
    public DateTime UpsertDate{ get; init; }
}
