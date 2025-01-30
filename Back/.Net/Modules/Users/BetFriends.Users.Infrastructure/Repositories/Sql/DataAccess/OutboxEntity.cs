using BetFriends.Shared.Infrastructure.Outboxes;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace BetFriends.Users.Infrastructure.Repositories.Sql.DataAccess;

[Table("outbox", Schema = "usr")]
public class OutboxEntity
{
    public OutboxEntity()
    {
        
    }

    public OutboxEntity(Outbox outbox)
    {
        Id = outbox.Id;
        OccurredOn = outbox.OccurredOn;
        Type = outbox.Type;
        Data = outbox.Data;
        ProcessedOn = outbox.ProcessedOn;
    }

    [Column("id", TypeName = "uniqueidentifier"), Key, Required]
    public Guid Id { get; init; }
    [Column("occured_on"), Required]
    public DateTime OccurredOn { get; init; }
    [Column("processed_on")]
    public DateTime? ProcessedOn { get; set; }
    [Column("type", TypeName = "varchar"), Required]
    public string Type { get; init; }
    [Column("data", TypeName = "varchar"), Required]
    public string Data { get; init; }
}
