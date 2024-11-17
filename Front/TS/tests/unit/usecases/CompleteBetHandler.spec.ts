import { describe, expect, test } from 'vitest';
import { FakeBetRepository } from '../implems/FakeBetRepository';
import { MockCompleteBetPresenter } from '../implems/MockCompleteBetPresenter';
import { CompleteBetHandler } from '../../../src/domain/features/CompleteBetHandler';

describe('complete bet handler', () => {
    test('should complete bet without proof when bookie failed', async () => {
        const request = {
            betId: "betId",
            isSuccess: false,
            proof: undefined
        }
        const betRepository = new FakeBetRepository();
        const presenter = new MockCompleteBetPresenter();
        const handler = new CompleteBetHandler(betRepository, presenter)
        await handler.Handle(request);
        expect(presenter.IsCompleted).toBeTruthy();
        expect(betRepository.BetsCompleted).toContainEqual(["betId", false])
    })

    test('should not complete bet without proof when bookie success', async () => {
        const request = {
            betId: "betId",
            isSuccess: true,
            proof: undefined
        }
        const betRepository = new FakeBetRepository();
        const presenter = new MockCompleteBetPresenter();
        const handler = new CompleteBetHandler(betRepository, presenter)
        await handler.Handle(request);
        expect(presenter.IsCompleted).toBeFalsy();
        expect(presenter.ErrorMessage).toEqual("proof is required");
        expect(betRepository.BetsCompleted).not.toContainEqual(["betId", true])
    })

    test('should complete bet with proof when bookie success', async () => {
        const request = {
            betId: "betId",
            isSuccess: true,
            proof: "filebs64"
        }
        const betRepository = new FakeBetRepository();
        const presenter = new MockCompleteBetPresenter();
        const handler = new CompleteBetHandler(betRepository, presenter)
        await handler.Handle(request);
        expect(presenter.IsCompleted).toBeTruthy();
        expect(presenter.ErrorMessage).toBeUndefined();
        expect(betRepository.BetsCompleted).toContainEqual(["betId", true])
    })
})





