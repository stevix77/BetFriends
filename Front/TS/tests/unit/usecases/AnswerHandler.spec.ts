import { describe, expect, test } from 'vitest';
import { AnswerBetHandler, IAnswerRequest } from '../../../src/domain/features/AnswerBetHandler'
import { FakeAnswerBetPresenter } from '../implems/FakeAnswerBetPresenter';
import { FakeBetRepository } from '../implems/FakeBetRepository';
import { StubDateTimeProvider } from '../implems/StubDateTimeProvider';
import { AnswerBetSut } from '../SUTs/AnswerBetSut';
describe('answer bet', () => {
    test('should answer', async () => {
        (await new AnswerBetSut()
            .WithDateProvider(new Date('2024-11-11'))
            .WhenAnswer({
                Answer: true,
                BetId: 'betId',
                BookieId: 'bookieId',
                EndDate: new Date('2024-11-30')
            }))
            .ShouldAcceptRequest({Answer: true, BetId: 'betId'})
    })

    test('should not answer when endDate is in the past', async() => {
        (await new AnswerBetSut()
            .WithDateProvider(new Date('2024-12-11'))
            .WhenAnswer({
                Answer: true,
                BetId: 'betId',
                BookieId: 'bookieId',
                EndDate: new Date('2024-11-30')
            }))
            .ShouldRejectRequest('Bet is over')
    })

    test('should not answer the same answer if has already answered', async () => {
        (await new AnswerBetSut()
            .WithDateProvider(new Date('2024-11-11'))
            .WithIdentifier('identifier')
            .WhenAnswer({
                Answer: true,
                BetId: 'betId',
                BookieId: 'userid',
                EndDate: new Date('2025-03-03'),
                OldAnswer: true
            }))
            .ShouldRejectRequest(`already answer true for bet betId`)
    })

    test('should not answer to an own bet', async () => {
        (await new AnswerBetSut()
            .WithDateProvider(new Date('2024-11-11'))
            .WithIdentifier('identifier')
            .WhenAnswer({
                Answer: true,
                BetId: 'betId',
                BookieId: 'identifier',
                EndDate: new Date('2025-03-03')
            }))
            .ShouldRejectRequest(`cannot answer to a own bet`)
    })
})