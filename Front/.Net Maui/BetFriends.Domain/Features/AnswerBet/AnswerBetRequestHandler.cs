using BetFriends.Domain.Abstractions;
using BetFriends.Domain.Bets;
using MediatR;

namespace BetFriends.Domain.Features.AnswerBet;

public class AnswerBetCommandHandler(IBetRepository betRepository,
                                     IAnswerBetOutputPort outputPort,
                                     IDateTimeProvider dateTimeProvider,
                                     IUserContext userContext) : IRequestHandler<AnswerBetRequest>
{
    private readonly IBetRepository betRepository = betRepository;
    private readonly IUserContext userContext = userContext;
    private readonly IDateTimeProvider dateTimeProvider = dateTimeProvider;
    private readonly IAnswerBetOutputPort answerBetOutputPort = outputPort;

    public async Task Handle(AnswerBetRequest request, CancellationToken cancellationToken)
    {
        if (IsEndDateBeforeCurrentDate(request.EndDate))
        {
            answerBetOutputPort.InvalidEndDate();
            return;
        }

        if (HasAlreadyAnswerThis(request.Answer, request.OldAnswer))
        {
            answerBetOutputPort.InvalidAnswer();
            return;
        }

        if (IsBookie(request.BookieId))
        {
            answerBetOutputPort.CannotAnswerToOwnBet();
            return;
        }
        await betRepository.AnswerBetAsync(request.BetId, request.Answer);
        answerBetOutputPort.Present(new AnswerBetResponse(request.Answer, request.BetId));
    }

    private bool IsBookie(string bookieId)
        => bookieId == userContext.UserId;

    private static bool HasAlreadyAnswerThis(bool currentAnswer, bool? oldAnswer)
        => currentAnswer == oldAnswer;

    private bool IsEndDateBeforeCurrentDate(DateTime endDate)
        => endDate < dateTimeProvider.GetCurrentDate();
}

public record AnswerBetResponse(bool Answer, string BetId);

public interface IAnswerBetOutputPort
{
    void CannotAnswerToOwnBet();
    void InvalidAnswer();
    void InvalidEndDate();
    void Present(AnswerBetResponse answerBetResponse);
}