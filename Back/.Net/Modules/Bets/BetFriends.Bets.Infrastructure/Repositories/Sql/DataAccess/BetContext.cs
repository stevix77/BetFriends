using Microsoft.EntityFrameworkCore;
using System.Diagnostics.CodeAnalysis;

namespace BetFriends.Bets.Infrastructure.Repositories.Sql.DataAccess;

internal class BetContext : DbContext
{
    public BetContext()
    {
    }

    public BetContext([NotNull] DbContextOptions options) : base(options)
    {
        
    }

    protected override void OnModelCreating(ModelBuilder modelBuilder)
    {
        modelBuilder.HasDefaultSchema("bet");
        base.OnModelCreating(modelBuilder);
    }

    public DbSet<BetEntity> Bets { get; set; }
    public DbSet<AnswerEntity> Answers { get; set; }
    public DbSet<FriendshipEntity> Friendships { get; set; }
    public DbSet<MemberEntity> Members { get; set; }
}
