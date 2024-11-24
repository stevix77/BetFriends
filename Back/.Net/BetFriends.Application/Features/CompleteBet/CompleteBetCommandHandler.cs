using BetFriends.Application.Abstractions;
using BetFriends.Application.Abstractions.Messaging;
using BetFriends.Domain.Bets;
using BetFriends.Domain.Members;

namespace BetFriends.Application.Features.CompleteBet;

public sealed class CompleteBetCommandHandler(IBetRepository betRepository, 
                                            ICompleteBetOutputPort outputPort,
                                            IUserContext userContext) : ICommandHandler<CompleteBetCommand>
{
    private readonly IBetRepository betRepository = betRepository;
    private readonly ICompleteBetOutputPort outputPort = outputPort;
    private readonly IUserContext userContext = userContext;

    public async Task Handle(CompleteBetCommand request, CancellationToken cancellationToken)
    {
        var bet = await betRepository.GetByIdAsync(new(request.BetId));
        if(bet is null)
        {
            outputPort.BetDoesNotExist(request.BetId);
            return;
        }
        bet.Close(request.IsSuccessful, userContext.UserId, request.Proof);
        await betRepository.SaveAsync(bet);
        outputPort.Success(new CompleteBetResponse(request.BetId, request.IsSuccessful));
    }
}
