﻿using BetFriends.Domain.AnswerBets;
using BetFriends.Infrastructure.Event;

namespace BetFriends.Infrastructure.Repositories;

internal class FakeAnswerBetRepository : IAnswerBetRepository
{
    private readonly ICollection<AnswerBet> answerBets;
    private readonly DomainEventsAccessor domainEventsAccessor;

    public FakeAnswerBetRepository(DomainEventsAccessor domainEventsAccessor)
    {
        answerBets = new HashSet<AnswerBet>();
        this.domainEventsAccessor = domainEventsAccessor;
    }

    public Task SaveAsync(AnswerBet answerBet)
    {
        var oldAnswerBet = answerBets.FirstOrDefault(x => x.State.MemberId == answerBet.State.MemberId);
        if (oldAnswerBet is not null)
            answerBets.Remove(oldAnswerBet);
        answerBets.Add(answerBet);
        domainEventsAccessor.Add(answerBet.Events);
        return Task.CompletedTask;
    }

    internal IEnumerable<AnswerBetState> Answers { get => answerBets.Select(x => x.State); }
}