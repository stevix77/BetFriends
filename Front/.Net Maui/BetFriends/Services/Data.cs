using BetFriends.Models;

namespace BetFriends.Services;

internal static class Data
{
    public static int Chips { get; internal set; } = 5000;
    internal static IEnumerable<MemberVM> Members
    {
        get => new List<MemberVM>
        {
            new MemberVM { Id = Guid.NewGuid().ToString(), Name = Guid.NewGuid().ToString().Substring(0, 8), IsFriend = new Random().Next(1000)%2 == 0 },
            new MemberVM { Id = Guid.NewGuid().ToString(), Name = Guid.NewGuid().ToString().Substring(0, 8), IsFriend = new Random().Next(1000)%2 == 0 },
            new MemberVM { Id = Guid.NewGuid().ToString(), Name = Guid.NewGuid().ToString().Substring(0, 8), IsFriend = new Random().Next(1000)%2 == 0 },
            new MemberVM { Id = Guid.NewGuid().ToString(), Name = Guid.NewGuid().ToString().Substring(0, 8), IsFriend = new Random().Next(1000)%2 == 0 },
            new MemberVM { Id = Guid.NewGuid().ToString(), Name = Guid.NewGuid().ToString().Substring(0, 8), IsFriend = new Random().Next(1000)%2 == 0 },
            new MemberVM { Id = Guid.NewGuid().ToString(), Name = Guid.NewGuid().ToString().Substring(0, 8), IsFriend = new Random().Next(1000)%2 == 0 },
            new MemberVM { Id = Guid.NewGuid().ToString(), Name = Guid.NewGuid().ToString().Substring(0, 8), IsFriend = new Random().Next(1000)%2 == 0 },
            new MemberVM { Id = Guid.NewGuid().ToString(), Name = Guid.NewGuid().ToString().Substring(0, 8), IsFriend = new Random().Next(1000)%2 == 0 },
            new MemberVM { Id = Guid.NewGuid().ToString(), Name = Guid.NewGuid().ToString().Substring(0, 8), IsFriend = new Random().Next(1000)%2 == 0 },
            new MemberVM { Id = Guid.NewGuid().ToString(), Name = Guid.NewGuid().ToString().Substring(0, 8), IsFriend = new Random().Next(1000)%2 == 0 },
            new MemberVM { Id = Guid.NewGuid().ToString(), Name = Guid.NewGuid().ToString().Substring(0, 8), IsFriend = new Random().Next(1000)%2 == 0 },
            new MemberVM { Id = Guid.NewGuid().ToString(), Name = Guid.NewGuid().ToString().Substring(0, 8), IsFriend = new Random().Next(1000)%2 == 0 },
            new MemberVM { Id = Guid.NewGuid().ToString(), Name = Guid.NewGuid().ToString().Substring(0, 8), IsFriend = new Random().Next(1000)%2 == 0 },
            new MemberVM { Id = Guid.NewGuid().ToString(), Name = Guid.NewGuid().ToString().Substring(0, 8), IsFriend = new Random().Next(1000)%2 == 0 },
            new MemberVM { Id = Guid.NewGuid().ToString(), Name = Guid.NewGuid().ToString().Substring(0, 8), IsFriend = new Random().Next(1000)%2 == 0 },
            new MemberVM { Id = Guid.NewGuid().ToString(), Name = Guid.NewGuid().ToString().Substring(0, 8), IsFriend = new Random().Next(1000)%2 == 0 },
            new MemberVM { Id = Guid.NewGuid().ToString(), Name = Guid.NewGuid().ToString().Substring(0, 8), IsFriend = new Random().Next(1000)%2 == 0 },
            new MemberVM { Id = Guid.NewGuid().ToString(), Name = Guid.NewGuid().ToString().Substring(0, 8), IsFriend = new Random().Next(1000)%2 == 0 }
        };
    }
}
