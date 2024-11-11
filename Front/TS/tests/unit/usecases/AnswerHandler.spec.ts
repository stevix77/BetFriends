import { describe, test } from 'vitest';
import { AnswerBetSut } from '../SUTs/AnswerBetSut';
describe('answer bet', () => {
    test('should answer', async () => {
        (await new AnswerBetSut()
            .WithDateProvider(new Date('2024-11-11'))
            .WhenAnswer({
                Answer: true,
                BetId: 'betId',
                BookieId: 'bookieId',
                MaxAnswerDate: new Date('2024-11-30')
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
                MaxAnswerDate: new Date('2024-11-30')
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
                MaxAnswerDate: new Date('2025-03-03'),
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
                MaxAnswerDate: new Date('2025-03-03')
            }))
            .ShouldRejectRequest(`cannot answer to a own bet`)
    })
})