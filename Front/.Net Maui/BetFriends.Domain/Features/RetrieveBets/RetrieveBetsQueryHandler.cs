using BetFriends.Domain.Bets;
using MediatR;

namespace BetFriends.Domain.Features.RetrieveBets;

public sealed class RetrieveBetsQueryHandler(IBetRepository betRepository) : IRequestHandler<RetrieveBetsQuery, IEnumerable<RetrieveBetsItemResponse>>
{
    private readonly IBetRepository betRepository = betRepository;

    public Task<IEnumerable<RetrieveBetsItemResponse>> Handle(RetrieveBetsQuery request, CancellationToken cancellationToken)
    {
        return betRepository.RetrieveBetsAsync();
    }
}

public record RetrieveBetsQuery() : IRequest<IEnumerable<RetrieveBetsItemResponse>>;

public record RetrieveBetsItemResponse(string BetId,
                                      string Description,
                                      int Coins,
                                      DateTime EndDate,
                                      DateTime MaxAnswerDate,
                                      string BookieId,
                                      string BookieName,
                                      IEnumerable<GamblerDto> Gamblers);
public record GamblerDto(string Id, string Name, bool? HasAccepted);