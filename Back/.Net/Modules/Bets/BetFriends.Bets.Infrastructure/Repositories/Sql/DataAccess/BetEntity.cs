using BetFriends.Bets.Domain.Bets;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace BetFriends.Bets.Infrastructure.Repositories.Sql.DataAccess;

[Table("bets", Schema = "bet")]
public class BetEntity
{
    public BetEntity()
    {

    }

    public BetEntity(Bet bet)
    {
        Id = bet.BetId.Value;
        Description = bet.Description;
        Coins = bet.Coins;
        EndDate = bet.EndDate;
        Guests = string.Join(';', bet.Guests);
        BettorId = bet.BookieId.Value;
        MaxAnswerDate = bet.MaxAnswerDate.Value;
    }

    [Column("surrogate_id", TypeName = "int")]
    public int SurrogateId { get; set; }
    [Column("id"), Key, Required]
    public Guid Id { get; set; }
    [Column("description", TypeName = "varchar(MAX)"), Required]
    public string Description { get; set; }
    [Column("coins", TypeName = "int"), Required]
    public int Coins { get; set; }
    [Column("end_date", TypeName = "datetime"), Required]
    public DateTime EndDate { get; set; }
    [Column("guests", TypeName = "varchar(MAX)"), Required]
    public string Guests { get; set; }
    [Column("bettor_id"), Required]
    public Guid BettorId { get; set; }
    [Column("max_answer_date", TypeName = "datetime"), Required]
    public DateTime MaxAnswerDate { get; set; }
    [Column("is_successful", TypeName = "bit")]
    public bool? IsSuccessful { get; set; }
}
