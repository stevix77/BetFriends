import { expect } from 'vitest';
import { Bet } from '../../../src/domain/bets/Bet';
import { CreateBetHandler, CreateBetResponse, ICreateBetRequest } from '../../../src/domain/features/CreateBetHandler';
import { FakeBetRepository } from '../implems/FakeBetRepository';
import { FakeCreateBetPresenter } from '../implems/FakeCreateBetPresenter';
import { StubDateTimeProvider } from '../implems/StubDateTimeProvider';
import { StubIdGenerator } from '../implems/StubIdGenerator';
export class CreateBetSut {
    
    private request: ICreateBetRequest;
    private betRepository: FakeBetRepository = new FakeBetRepository();
    private presenter = new FakeCreateBetPresenter;
    private idGenerator = new StubIdGenerator("id");
    private dateTimeProvider: StubDateTimeProvider;
    
    WithRequest(request: ICreateBetRequest) {
        this.request = request
        return this;
    }
    
    WithCurrentDate(currentDate: Date) {
        this.dateTimeProvider = new StubDateTimeProvider(currentDate)
        return this;
    }

    async WhenExecuteHandler() : Promise<CreateBetSut> {
        const handler = new CreateBetHandler(this.betRepository, this.presenter, this.idGenerator, this.dateTimeProvider);
        await handler.Handle(this.request);
        return this;
    }
    
    BetShouldBeCreated() {
        expect(this.betRepository.Bets).toContainEqual(new Bet(this.idGenerator.Generate(), 
                                                                this.request.Description, 
                                                                this.request.EndDate,
                                                                this.request.Chips,
                                                                this.request.Friends))
        expect(this.presenter.Bet).toEqual(new CreateBetResponse(this.idGenerator.Generate(), 
                                                                this.request.Description, 
                                                                this.request.EndDate,
                                                                this.request.Chips,
                                                                this.request.Friends))
    }
    
    BetIsNotCreated(error: string) {
        expect(this.betRepository.Bets).toEqual([]);
        expect(this.presenter.Bet).toBeUndefined();
        expect(this.presenter.Error).toBe(error);
    }
    
}