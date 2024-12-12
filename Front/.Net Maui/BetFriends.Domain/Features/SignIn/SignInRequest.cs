using MediatR;

namespace BetFriends.Domain.Features.SignIn;

public record SignInRequest(string Email, string Password) : IRequest;
