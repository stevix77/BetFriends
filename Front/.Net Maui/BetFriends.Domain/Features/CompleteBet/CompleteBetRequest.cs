using MediatR;

namespace BetFriends.Domain.Features.CompleteBet;

public record CompleteBetRequest(string BetId, bool IsSuccess, string? Proof = null) : IRequest;
