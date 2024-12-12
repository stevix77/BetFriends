using BetFriends.Domain.Abstractions;
using System.Security.Cryptography;
using System.Text;

namespace BetFriends.Infrastructure.Hash;

internal class HashPassword : IHashPassword
{
    public string Hash(string password)
    {
        var data = Encoding.Default.GetBytes(password);
        var hhmac = new HMACSHA256(data);
        data = hhmac.ComputeHash(data);
        var sBuilder = new StringBuilder();
        for (int i = 0; i < data.Length; i++)
            sBuilder.Append(data[i].ToString("x2"));
        return sBuilder.ToString();
    }
}
