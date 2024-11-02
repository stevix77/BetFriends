import { describe, expect, test } from 'vitest';
import { AnswerBetHandler, IAnswerRequest } from '../../../src/domain/features/AnswerBetHandler'
describe('answer bet', () => {
    test('should answer', async () => {
        const command: IAnswerRequest = {
            Answer: true,
            BetId: 'betId',
            BookieId: 'bookieId',
            EndDate: new Date('2024-11, 30')
        };
        const handler = new AnswerBetHandler()
    })
})