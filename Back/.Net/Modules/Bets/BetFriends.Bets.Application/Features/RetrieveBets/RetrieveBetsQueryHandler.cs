﻿using BetFriends.Bets.Application.Abstractions;
using BetFriends.Shared.Application.Abstractions.Messaging;

namespace BetFriends.Bets.Application.Features.RetrieveBets;

public class RetrieveBetsQueryHandler(IRetrieveBetsDataAccess retrieveBetsDataAccess,
                                      IUserContext userContext) : IQueryHandler<RetrieveBetsQuery, IEnumerable<RetrieveBetsResponse>>
{
    private readonly IRetrieveBetsDataAccess retrieveBetsDataAccess = retrieveBetsDataAccess;
    private readonly IUserContext userContext = userContext;

    public Task<IEnumerable<RetrieveBetsResponse>> Handle(RetrieveBetsQuery request, CancellationToken cancellationToken)
    {
        return retrieveBetsDataAccess.GetAsync(userContext.UserId);
    }
}


public record RetrieveBetsQuery : IQuery<IEnumerable<RetrieveBetsResponse>>;
public record RetrieveBetsResponse(Guid Id,
                                   string Description,
                                   DateTime EndDate,
                                   int Coins,
                                   Guid BettorId,
                                   string BettorName,
                                   DateTime MaxAnswerDate,
                                   IEnumerable<GamblerDto> Gamblers);

public record GamblerDto(Guid Id, string Name, bool? HasAccepted);

public interface IRetrieveBetsDataAccess
{
    Task<IEnumerable<RetrieveBetsResponse>> GetAsync(Guid memberId);
}