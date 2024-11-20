using BetFriends.Domain.Bets;
using MediatR;

namespace BetFriends.Domain.Features.CompleteBet;

public sealed class CompleteBetHandler(IBetRepository betRepository, ICompleteBetOutputPort outputPort) : IRequestHandler<CompleteBetRequest>
{
    private readonly IBetRepository betRepository = betRepository;
    private readonly ICompleteBetOutputPort outputPort = outputPort;

    public async Task Handle(CompleteBetRequest request, CancellationToken cancellationToken)
    {
        if (IsProofIsRequired(request))
        {
            outputPort.ProofIsMissing(request.BetId);
            return;
        }
        await betRepository.CompleteBetAsync(request.BetId, request.IsSuccess, request.Proof, cancellationToken);
        outputPort.Success(request.BetId, request.IsSuccess);
    }

    private static bool IsProofIsRequired(CompleteBetRequest request)
    {
        return request.IsSuccess && string.IsNullOrWhiteSpace(request.Proof);
    }
}
