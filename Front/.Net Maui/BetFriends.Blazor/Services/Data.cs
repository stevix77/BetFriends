namespace BetFriends.Blazor.Services;

internal static class Data
{
    internal static string Username { get; private set; }
    internal static int Coins { get; private set; }

    internal static void DecreaseCoins(int coins)
    {
        Coins -= coins;
    }

    internal static void SetInfo(string username, int coins)
    {
        Username = username;
        Coins = coins;
    }
}
