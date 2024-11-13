using BetFriends.Domain.Bets;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace BetFriends.Infrastructure.Repositories.Sql.DataAccess;

[Table("bets", Schema = "bet")]
internal class BetEntity
{
    public BetEntity()
    {

    }

    public BetEntity(Bet bet)
    {
        Id = bet.BetId.Value;
        Description = bet.Description;
        Chips = bet.Coins;
        EndDate = bet.EndDate;
        Friends = string.Join(';', bet.Guests);
        OwnerId = bet.OwnerId.Value;
    }

    [Column("surrogate_id", TypeName = "int")]
    public int SurrogateId { get; set; }
    [Column("id"), Key, Required]
    public Guid Id { get; set; }
    [Column("description", TypeName = "varchar(MAX)")]
    public string Description { get; set; }
    [Column("chips", TypeName = "int")]
    public int Chips { get; set; }
    [Column("end_date", TypeName = "datetime")]
    public DateTime EndDate { get; set; }
    [Column("friends", TypeName = "varchar(MAX)")]
    public string Friends { get; set; }
    [Column("owner_id")]
    public Guid OwnerId { get; set; }
}
