using BetFriends.Application.Abstractions;
using BetFriends.Domain.Bets;
using BetFriends.Domain.Members;
using BetFriends.Shared.Application.Abstractions;
using BetFriends.Shared.Application.Abstractions.Messaging;

namespace BetFriends.Application.Features.CreateBet;

public class CreateBetCommandHandler : ICommandHandler<CreateBetCommand>
{
    private readonly IBetRepository betRepository;
    private readonly IMemberRepository memberRepository;
    private readonly IIdGenerator idGenerator;
    private IUserContext userContext;
    private ICreateBetOutputPort createBetOutputPort;
    private readonly IDateProvider dateTimeProvider;

    public CreateBetCommandHandler(IBetRepository betRepository,
                                   IMemberRepository memberRepository,
                                   IIdGenerator idGenerator,
                                   IUserContext userContext,
                                   ICreateBetOutputPort createBetOutputPort,
                                   IDateProvider dateTimeProvider)
    {
        this.betRepository = betRepository;
        this.memberRepository = memberRepository;
        this.idGenerator = idGenerator;
        this.userContext = userContext;
        this.createBetOutputPort = createBetOutputPort;
        this.dateTimeProvider = dateTimeProvider;
    }

    public async Task Handle(CreateBetCommand command, CancellationToken cancellationToken)
    {
        if (!IsValidCommand(command))
            return;

        var member = await memberRepository.GetByIdAsync(new(userContext.UserId));
        if (member == null)
        {
            createBetOutputPort.MemberDoesNotExist(userContext.UserId);
            return;
        }
        var bet = member.Bet(new BetId(idGenerator.Generate()),
                             command.Description,
                             command.Chips,
                             command.EndDate,
                             command.Friends,
                             dateTimeProvider.GetDate());
        await betRepository.SaveAsync(bet);
        createBetOutputPort.Present(new CreateBetResponse(bet.BetId.Value));
    }

    private bool IsValidCommand(CreateBetCommand command)
    {
        if (dateTimeProvider.GetDate() > command.EndDate)
        {
            createBetOutputPort.EndDateIsTooOld();
            return false;
        }

        if (command.Chips < 1)
        {
            createBetOutputPort.CoinsMissing();
            return false;
        }

        if (!command.Friends.Any())
        {
            createBetOutputPort.FriendsMissing();
            return false;
        }
        return true;
    }
}

public record CreateBetCommand(string Description, int Chips, DateTime EndDate, IEnumerable<Guid> Friends) : ICommand;

public record CreateBetResponse(Guid BetId);
