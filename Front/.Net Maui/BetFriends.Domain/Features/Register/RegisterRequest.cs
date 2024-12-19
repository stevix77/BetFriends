using MediatR;

namespace BetFriends.Domain.Features.Register;

public record RegisterRequest(string Username, string Email, string Password, string ConfirmPassword) : IRequest;
