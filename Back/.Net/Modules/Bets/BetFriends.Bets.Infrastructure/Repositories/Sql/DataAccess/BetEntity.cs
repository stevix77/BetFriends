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
        Friends = string.Join(';', bet.Guests);
        BookieId = bet.BookieId.Value;
    }

    [Column("surrogate_id", TypeName = "int")]
    public int SurrogateId { get; set; }
    [Column("id"), Key, Required]
    public Guid Id { get; set; }
    [Column("description", TypeName = "varchar(MAX)")]
    public string Description { get; set; }
    [Column("coins", TypeName = "int")]
    public int Coins { get; set; }
    [Column("end_date", TypeName = "datetime")]
    public DateTime EndDate { get; set; }
    [Column("friends", TypeName = "varchar(MAX)")]
    public string Friends { get; set; }
    [Column("bookie_id")]
    public Guid BookieId { get; set; }
}
