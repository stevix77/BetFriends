using BetFriends.Users.Domain.Users;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace BetFriends.Users.Infrastructure.Repositories.Sql.DataAccess;

[Table("users", Schema = "usr")]
public class UserEntity
{
    public UserEntity()
    {
        
    }

    public UserEntity(UserSnapshot user)
    {
        Id = user.Id;
        Username = user.Username;
        Email = user.Email;
        Password = user.Password;
        RefreshToken = user.RefreshToken;
    }

    [Column("id", TypeName = "uniqueidentifier"), Key, Required]
    public Guid Id { get; init; }
    [Column("username", TypeName = "varchar(MAX)")]
    public string Username { get; set; }
    [Column("email", TypeName = "varchar(MAX)")]
    public string Email { get; set; }
    [Column("password", TypeName = "varchar(MAX)")]
    public string Password { get; set; }
    [Column("refresh_token", TypeName = "varchar(MAX)")]
    public string RefreshToken { get; set; }
}
