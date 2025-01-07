using BetFriends.Bets.Domain.Members;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace BetFriends.Bets.Infrastructure.Repositories.Sql.DataAccess;

[Table("members", Schema = "bet")]
public class MemberEntity
{
    public MemberEntity()
    {
        
    }

    public MemberEntity(Member member)
    {
        var snapshot = member.Snapshot;
        Wallet = snapshot.Coins;
        MemberId = snapshot.MemberId;
        Username = snapshot.Username;
        CountFriends = snapshot.CountFriends;
    }

    [Column("wallet", TypeName = "int"), Required]
    public int Wallet { get; set; }
    [Column("member_id"), Key, Required]
    public Guid MemberId { get; init; }
    [Column("username", TypeName = "varchar(50)"), Required]
    public string Username { get; init; }
    [Column("count_friends", TypeName = "int"), Required]
    public int CountFriends { get; set; }
    [Column("created_at", TypeName = "datetime")]
    public DateTime CreatedAt { get; init; }

    internal void Update(MemberState member)
    {
        Wallet = member.Coins;
        CountFriends = member.CountFriends;
    }
}
