using BetFriends.Users.Application.Abstractions;
using BetFriends.Users.Application.Features.SignIn;
using BetFriends.Users.Domain.Users;
using BetFriends.Users.Infrastructure.Repositories.Sql.DataAccess;
using BetFriends.Users.Infrastructure.TokenGenerators;
using Microsoft.EntityFrameworkCore;

namespace BetFriends.Users.Infrastructure.Gateways;

internal class AuthenticationGateway(UserContext userContext, JwtTokenGenerator jwtTokenGenerator) : IAuthenticationGateway
{
    private readonly UserContext userContext = userContext;

    public async Task<Authentication> AuthenticateAsync(AuthenticationRequest authenticationRequest)
    {
        var entity = await userContext.Users.FirstOrDefaultAsync(x => x.Email == authenticationRequest.Email &&
                                                                    x.Password == authenticationRequest.Password);
        if (entity == null)
            return default!;
        var jwtToken = jwtTokenGenerator.GenerateToken(new UserSnapshot(entity.Id,
                                                                        entity.Username,
                                                                        entity.Email,
                                                                        entity.Password,
                                                                        entity.RefreshToken));
        return new Authentication(jwtToken, 
                                  entity.RefreshToken);
    }
}
