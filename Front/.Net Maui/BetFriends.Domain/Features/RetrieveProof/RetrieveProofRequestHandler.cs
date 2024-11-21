using BetFriends.Domain.Bets;
using MediatR;

namespace BetFriends.Domain.Features.RetrieveProof;

public sealed class RetrieveProofRequestHandler(IBetRepository betRepository) : IRequestHandler<RetrieveProofRequest, byte[]>
{
    private readonly IBetRepository betRepository = betRepository;

    public Task<byte[]> Handle(RetrieveProofRequest request, CancellationToken cancellationToken)
        => betRepository.RetrieveProofAsync(request.BetId);
}
