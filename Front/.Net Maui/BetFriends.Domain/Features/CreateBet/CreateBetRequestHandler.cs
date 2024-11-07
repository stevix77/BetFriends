using BetFriends.Domain.Abstractions;
using BetFriends.Domain.Bets;
using MediatR;

namespace BetFriends.Domain.Features.CreateBet;

public sealed class CreateBetRequestHandler : IRequestHandler<CreateBetRequest>
{
    private readonly IBetRepository betRepository;
    private readonly IDateTimeProvider dateTimeProvider;
    private readonly ICreateBetOutputPort presenter;
    private readonly IIdGenerator idGenerator;

    public CreateBetRequestHandler(IBetRepository betRepository,
                                   IDateTimeProvider dateTimeProvider,
                                   ICreateBetOutputPort presenter,
                                   IIdGenerator idGenerator)
    {
        this.betRepository = betRepository;
        this.dateTimeProvider = dateTimeProvider;
        this.presenter = presenter;
        this.idGenerator = idGenerator;
    }

    public async Task Handle(CreateBetRequest request, CancellationToken cancellationToken)
    {
        if (!IsValidRequest(request))
            return;
        var id = idGenerator.Generate();
        var bet = new Bet(id, request.Description, request.EndDate, request.Chips, request.Friends);
        await betRepository.SaveAsync(bet, cancellationToken);
        presenter.Present(new CreateBetResponse(id, request.Description, request.EndDate, request.Chips, request.Friends));
    }

    private bool IsValidRequest(CreateBetRequest request)
    {
        if (request.EndDate < dateTimeProvider.GetCurrentDate().Date)
        {
            presenter.EndDateIsNotValide(request.EndDate);
            return false;
        }

        if (string.IsNullOrWhiteSpace(request.Description))
        {
            presenter.DescriptionIsEmpty();
            return false;
        }

        if (!request.Friends.Any())
        {
            presenter.FriendsIsRequired();
            return false;
        }

        if (request.Chips == 0)
        {
            presenter.ChipsAreRequired();
            return false;
        }
        return true;
    }
}

public record Bet(string Id, string Description, DateTime EndDate, int Coins, IEnumerable<string> Friends);

public record CreateBetRequest(string Description,
                               DateTime EndDate,
                               int Chips,
                               IEnumerable<string> Friends) : IRequest;

public record CreateBetResponse(string Id,
                                string Description,
                               DateTime EndDate,
                               int Coins,
                               IEnumerable<string> Friends);

public interface ICreateBetOutputPort
{
    void ChipsAreRequired();
    void DescriptionIsEmpty();
    void EndDateIsNotValide(DateTime endDate);
    void FriendsIsRequired();
    void Present(CreateBetResponse createBetResponse);
}