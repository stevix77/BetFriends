using BetFriends.Shared.Application.Abstractions.Messaging;

namespace BetFriends.Bets.Application.Features.CompleteBet;

public record CompleteBetCommand(Guid BetId, bool IsSuccessful, string? Proof = null) : ICommand;
