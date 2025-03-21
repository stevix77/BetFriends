﻿using BetFriends.Bets.Domain.AnswerBets;
using MediatR;

namespace BetFriends.Bets.Application.Features.CompleteBet;

public sealed class NotifyBetCompletedNotificationHandler(IAnswerBetRepository answerBetRepository,
                                               INotifyBetCompleted notifyBetCompleted) : INotificationHandler<BetCompletedEventNotification>
{
    private readonly IAnswerBetRepository answerBetRepository = answerBetRepository;
    private readonly INotifyBetCompleted notifyBetCompleted = notifyBetCompleted;

    public async Task Handle(BetCompletedEventNotification notification, CancellationToken cancellationToken)
    {
        var answerBets = await answerBetRepository.GetAnswersAsync(new(notification.BetId));
        if (answerBets is null || !answerBets.Any(x => x.HasAccepted()))
            return;

        await notifyBetCompleted.Notify(new Notification(
            notification.BetId,
            answerBets.Where(x => x.HasAccepted())
                      .Select(x => x.Snapshot.MemberId),
            notification.IsSuccessful));
    }
}

public interface INotifyBetCompleted
{
    Task Notify(Notification notification);
}

public record Notification(Guid BetId, IEnumerable<Guid> Gamblers, bool IsSuccessful);