using BetFriends.Application.Abstractions;
using BetFriends.Domain.AnswerBets;
using BetFriends.Domain.Bets;
using BetFriends.Domain.Members;
using BetFriends.Shared.Application.Abstractions;
using BetFriends.Shared.Application.Abstractions.Messaging;

namespace BetFriends.Application.Features.AnswerBet;

public sealed class AnswerBetCommandHandler(IAnswerBetRepository answerBetRepository,
                                            IAnswerBetOutputPort answerBetOutputPort,
                                            IBetRepository betRepository,
                                            IUserContext userContext,
                                            IDateProvider dateProvider,
                                            IMemberRepository memberRepository) : ICommandHandler<AnswerBetCommand>
{
    private readonly IBetRepository betRepository = betRepository;
    private readonly IUserContext userContext = userContext;
    private readonly IDateProvider dateProvider = dateProvider;
    private readonly IMemberRepository memberRepository = memberRepository;
    private readonly IAnswerBetRepository answerBetRepository = answerBetRepository;
    private readonly IAnswerBetOutputPort answerBetOutputPort = answerBetOutputPort;

    public async Task Handle(AnswerBetCommand request, CancellationToken cancellationToken)
    {
        var bet = await betRepository.GetByIdAsync(new BetId(request.BetId));
        if (bet is null)
        {
            answerBetOutputPort.BetDoesNotExist();
            return;
        }

        var member = await memberRepository.GetByIdAsync(new(userContext.UserId));
        if (member is null)
        {
            answerBetOutputPort.MemberDoesNotExist();
            return;
        }
        var answerBetResponse = bet.AddAnswer(member, request.Answer, dateProvider.GetDate());
        if (!answerBetResponse.Error.HasValue)
        {
            await answerBetRepository.SaveAsync(answerBetResponse.AnswerBet);
            answerBetOutputPort.Success();
            return;
        }
        switch (answerBetResponse.Error)
        {
            case AnswerErrorCode.NotRequested:
                answerBetOutputPort.MemberIsNotAuthorized();
                break;
            case AnswerErrorCode.NotEnoughCoins:
                answerBetOutputPort.MemberHasNotEnoughCoins();
                break;
            case AnswerErrorCode.TimeToAnswerOver:
                answerBetOutputPort.TimeToAnswerIsOver();
                break;
        }
    }
}

public interface IAnswerBetOutputPort
{
    void BetDoesNotExist();
    void MemberDoesNotExist();
    void MemberHasNotEnoughCoins();
    void MemberIsNotAuthorized();
    void Success();
    void TimeToAnswerIsOver();
}