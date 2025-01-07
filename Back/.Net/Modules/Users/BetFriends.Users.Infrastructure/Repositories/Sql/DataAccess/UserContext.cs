using Microsoft.EntityFrameworkCore;
using System.Diagnostics.CodeAnalysis;

namespace BetFriends.Users.Infrastructure.Repositories.Sql.DataAccess;

internal class UserContext : DbContext
{
    public UserContext()
    {
    }

    public UserContext([NotNull] DbContextOptions options) : base(options)
    {

    }

    protected override void OnModelCreating(ModelBuilder modelBuilder)
    {
        modelBuilder.HasDefaultSchema("usr");
        base.OnModelCreating(modelBuilder);
    }

    public DbSet<UserEntity> Users{ get; set; }
}
