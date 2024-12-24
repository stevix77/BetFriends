using BetFriends.Shared.Application.Abstractions.Messaging;

namespace BetFriends.Users.Application.Features.Register;

public record RegisterCommand(string Username, string Email, string Password, IRegisterOutputPort outputPort) : ICommand;
