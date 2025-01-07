using BetFriends.Bets.Domain.AnswerBets;
using BetFriends.Bets.Domain.Bets;
using BetFriends.Bets.Domain.Members;
using MediatR;

namespace BetFriends.Bets.Application.Features.CompleteBet;

public class UpdateBalanceNotificationHandler(IBetRepository betRepository,
                                            IMemberRepository memberRepository,
                                            IAnswerBetRepository answerBetRepository)
    : INotificationHandler<BetCompletedNotification>
{
    private readonly IBetRepository betRepository = betRepository;
    private readonly IMemberRepository memberRepository = memberRepository;
    private readonly IAnswerBetRepository answerBetRepository = answerBetRepository;

    public async Task Handle(BetCompletedNotification notification, CancellationToken cancellationToken)
    {
        var bet = await betRepository.GetByIdAsync(notification.BetId);
        if (bet == null)
            return;
        var bookie = await memberRepository.GetByIdAsync(bet.BookieId);
        var answers = await answerBetRepository.GetAnswersAsync(bet.BetId);
        if (notification.IsSuccessful)
        {
            bookie.IncreaseBalance(bet.Coins * answers.Count(x => x.HasAccepted()));
            await memberRepository.SaveAsync(bookie);
            return;
        }
        var gamblers = await memberRepository.GetByIdsAsync(answers.Where(x => x.HasAccepted())
                                                                   .Select(x => x.Snapshot.MemberId));
        foreach (var gambler in gamblers)
            gambler.IncreaseBalance(bet.Coins / gamblers.Count());
        await memberRepository.SaveAsync(gamblers);
    }
}
