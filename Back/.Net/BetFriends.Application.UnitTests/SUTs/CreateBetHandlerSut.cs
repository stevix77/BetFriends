using BetFriends.Application.Features.CreateBet;
using BetFriends.Application.UnitTests.Implems;
using BetFriends.Domain.Members;

namespace BetFriends.Application.UnitTests.SUTs;

internal class CreateBetHandlerSut
{
    private Guid betId;
    private Guid userId;
    private readonly MockCreateBetPresenter createBetPresenter;
    private readonly MockBetRepository betRepository;
    private CreateBetCommand command;
    private StubDateProvider dateTimeProvider;
    private Exception record;
    private Member member;

    public CreateBetHandlerSut()
    {
        betRepository = new MockBetRepository();
        createBetPresenter = new MockCreateBetPresenter();
        dateTimeProvider = new StubDateProvider(new DateTime(2024, 2, 2));
    }

    internal CreateBetHandlerSut WithBetId(Guid betId)
    {
        this.betId = betId;
        return this;
    }

    internal CreateBetHandlerSut WithUserId(Guid userId)
    {
        this.userId = userId;
        return this;
    }

    internal CreateBetHandlerSut WithCommand(CreateBetCommand createBetCommand)
    {
        command = createBetCommand;
        return this;
    }

    internal CreateBetHandlerSut WithCurrentDate(DateTime dateTime)
    {
        dateTimeProvider = new StubDateProvider(dateTime);
        return this;
    }

    internal CreateBetHandlerSut WithMember(Member member)
    {
        this.member = member;
        return this;
    }

    internal async Task<CreateBetHandlerSut> WhenExecuteCommand()
    {
        var userContext = new StubUserContext(userId);
        var idGenerator = new StubIdGenerator(betId);
        var memberRepository = new StubMemberRepository(member);
        var handler = new CreateBetCommandHandler(betRepository, memberRepository, idGenerator, userContext, createBetPresenter, dateTimeProvider);
        record = await Record.ExceptionAsync(() => handler.Handle(command, default!));
        return this;
    }

    internal void ShouldCreateBet()
    {
        Assert.Equal(new CreateBetResponse(betId), createBetPresenter.Response);
        Assert.Equal(command.EndDate, betRepository.Bet.EndDate);
        Assert.Equal(command.Description, betRepository.Bet.Description);
        Assert.Equal(command.Chips, betRepository.Bet.Chips);
        Assert.Equal(betId, betRepository.Bet.BetId.Value);
        Assert.Equal(userId, betRepository.Bet.OwnerId.Value);
        Assert.Equivalent(command.Friends, betRepository.Bet.Friends);
    }

    internal void ShouldNotCreateBet(Type exceptionType, string message)
    {
        Assert.IsType(exceptionType, record);
        Assert.Equal(message, record.Message);
        Assert.Null(betRepository.Bet);
    }

    internal void ShouldNotCreateBet(string message)
    {
        Assert.Equal(message, createBetPresenter.ErrorMessage);
        Assert.Null(betRepository.Bet);
    }
}
