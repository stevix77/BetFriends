using BetFriends.Bets.Domain.Friendships;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace BetFriends.Bets.Infrastructure.Repositories.Sql.DataAccess;

[Table("friendships", Schema = "bet")]
public class FriendshipEntity
{
    public FriendshipEntity()
    {
        
    }

    public FriendshipEntity(Friendship friendship)
    {
        FriendId = friendship.FriendId;
        RequesterId = friendship.RequesterId;
    }

    [Column("friend_id"), Required]
    public Guid FriendId { get; init; }
    [Column("requester_id"), Required]
    public Guid RequesterId { get; init; }

    [Column("created_at")]
    public DateTime CreatedAt { get; init; }
}
