using MediatR;

namespace BetFriends.Domain.Features.RetrieveProof;

public record RetrieveProofRequest(string BetId) : IRequest<byte[]>;
