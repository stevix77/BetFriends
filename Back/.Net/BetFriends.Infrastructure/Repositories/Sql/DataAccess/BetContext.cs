using Microsoft.EntityFrameworkCore;
using System.Diagnostics.CodeAnalysis;

namespace BetFriends.Infrastructure.Repositories.Sql.DataAccess;

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
}
