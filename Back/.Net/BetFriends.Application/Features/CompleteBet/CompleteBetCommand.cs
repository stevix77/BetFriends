using BetFriends.Application.Abstractions.Messaging;

namespace BetFriends.Application.Features.CompleteBet;

public record CompleteBetCommand(Guid BetId, bool IsSuccessful, string? Proof = null) : ICommand;
