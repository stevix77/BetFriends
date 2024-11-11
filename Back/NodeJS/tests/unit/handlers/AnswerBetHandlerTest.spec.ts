import { describe, expect, test } from 'vitest';
import { AnswerBetSut } from '../SUTs/AnswerBetSut';
import { AnswerBetCommand } from '../../../src/application/features/answer-bet/AnswerBetHandler';
describe('answer bet', () => {
    
    test('gambler can answer to a bet', async () => {
        (await new AnswerBetSut('betId', 'bettorId', 'gamblerId')
                        .WithExistingBet()
                        .WithExistingMember(1000)
                        .WhenExecuteHandler(new AnswerBetCommand('betId', true)))
                        .ShouldSaveAnswer()
    })

    test('Should not answer when bet does not exist', async () => {
        (await new AnswerBetSut('betId', 'bettorId', 'gamblerId')
                .WhenExecuteHandler(new AnswerBetCommand('betId', true)))
                .ShouldNotSaveAnswer("bet does not exist")
    })

    test('should not answer when user is not invited to this bet', async () => {
        (await new AnswerBetSut('betId', 'bettorId', 'gamblerId')
                .WithExistingBet()
                .WithExistingMember(1000)
                .WithUser('userId')
                .WhenExecuteHandler(new AnswerBetCommand('betId', true)))
                .ShouldNotSaveAnswer("user is not invited on this bet")
    })

    test('should not answer when user does not exist', async () => {
        (await new AnswerBetSut('betId', 'bettorId', 'gamblerId')
                .WithExistingBet()
                .WithoutMember()
                .WhenExecuteHandler(new AnswerBetCommand('betId', true)))
                .ShouldNotSaveAnswer("user is not existing")
    })

    test('should not answer when user is the bettor', async () => {
        (await new AnswerBetSut('betId', 'bettorId', 'gamblerId')
                .WithExistingBet()
                .WithUser('bettorId')
                .WhenExecuteHandler(new AnswerBetCommand('betId', true)))
                .ShouldNotSaveAnswer("user is the creator of bet")
    })

    test('should not answer when member has not enough coins', async () => {
        (await new AnswerBetSut('betId', 'bettorId', 'gamblerId')
                .WithExistingBet()
                .WithExistingMember(0)
                .WhenExecuteHandler(new AnswerBetCommand('betId', true)))
                .ShouldNotSaveAnswer("user has not enough coins")
    })

    test('should not answer when time for answer is over', async () => {
        (await new AnswerBetSut('betId', 'bettorId', 'gamblerId')
                .WithExistingBet()
                .WithCurrentDate(new Date("2024-12-12"))
                .WhenExecuteHandler(new AnswerBetCommand('betId', true)))
                .ShouldNotSaveAnswer("time for answer is over")
    })
})