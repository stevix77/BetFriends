using BetFriends.Application.Abstractions.Messaging;
using BetFriends.Domain.AnswerBets;
using BetFriends.Domain.Bets;

namespace BetFriends.Application.Features.AnswerBet;

public sealed class AnswerBetCommandHandler(IAnswerBetRepository answerBetRepository, 
                                            IAnswerBetOutputPort answerBetOutputPort,
                                            IBetRepository betRepository) : ICommandHandler<AnswerBetCommand>
{
    private readonly IBetRepository betRepository = betRepository;
    private readonly IAnswerBetRepository answerBetRepository = answerBetRepository;
    private readonly IAnswerBetOutputPort answerBetOutputPort = answerBetOutputPort;

    public async Task Handle(AnswerBetCommand request, CancellationToken cancellationToken)
    {
        var bet = await betRepository.GetByIdAsync(new BetId(request.BetId));
        if(bet is null)
        {
            answerBetOutputPort.BetDoesNotExist();
            return;
        }
        var answerBet = bet.AddAnswer(request.Answer);
        await answerBetRepository.SaveAsync(answerBet);
        answerBetOutputPort.Success();
    }
}

public interface IAnswerBetOutputPort
{
    void BetDoesNotExist();
    void Success();
}