import { describe, expect, test } from 'vitest';
import { AnswerBetHandler, IAnswerRequest } from '../../../src/domain/features/AnswerBetHandler'
import { FakeAnswerBetPresenter } from '../implems/FakeAnswerBetPresenter';
import { FakeBetRepository } from '../implems/FakeBetRepository';
import { StubDateTimeProvider } from '../implems/StubDateTimeProvider';
describe('answer bet', () => {
    test('should answer', async () => {
        const request: IAnswerRequest = {
            Answer: true,
            BetId: 'betId',
            BookieId: 'bookieId',
            EndDate: new Date('2024-11-30')
        };
        const betRepository = new FakeBetRepository();
        const dtProvider = new StubDateTimeProvider(new Date('2024-11-11'));
        const outputPort = new FakeAnswerBetPresenter()
        const handler = new AnswerBetHandler(betRepository, dtProvider, outputPort)
        await handler.Handle(request)
        expect(outputPort.AnswerResponse).toEqual({Answer: request.Answer, BetId: request.BetId})
    })

    test('should not answer when endDate is in the past', async() => {
        const request: IAnswerRequest = {
            Answer: true,
            BetId: 'betId',
            BookieId: 'bookieId',
            EndDate: new Date('2024-11-30')
        };
        const betRepository = new FakeBetRepository();
        const dtProvider = new StubDateTimeProvider(new Date('2025-11-30'));
        const outputPort = new FakeAnswerBetPresenter()
        const handler = new AnswerBetHandler(betRepository, dtProvider, outputPort)
        await handler.Handle(request)
        expect(outputPort.Error).toBe('Bet is over')
    })
})