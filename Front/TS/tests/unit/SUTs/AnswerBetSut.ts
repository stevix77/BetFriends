import { expect } from "vitest";
import { AnswerBetHandler, IAnswerRequest } from "../../../src/domain/features/AnswerBetHandler";
import { FakeAnswerBetPresenter } from "../implems/FakeAnswerBetPresenter";
import { FakeBetRepository } from "../implems/FakeBetRepository";
import { StubDateTimeProvider } from "../implems/StubDateTimeProvider";

export class AnswerBetSut {
    
    constructor() {
        this.betRepository = new FakeBetRepository();
        this.outputPort = new FakeAnswerBetPresenter();
    }
    private dateTimeProvider: StubDateTimeProvider;
    private readonly outputPort: FakeAnswerBetPresenter
    private readonly betRepository: FakeBetRepository;

    WithDateProvider(date: Date): AnswerBetSut {
        this.dateTimeProvider = new StubDateTimeProvider(date);
        return this;
    }

    async WhenAnswer(request: IAnswerRequest): Promise<AnswerBetSut> {
        const handler = new AnswerBetHandler(this.betRepository, 
                                            this.dateTimeProvider, 
                                            this.outputPort);
        await handler.Handle(request);
        return this;
    }

    ShouldAcceptRequest(response: {Answer: boolean, BetId: string}) {
        expect(this.outputPort.AnswerResponse).toEqual(response)
    }

    ShouldRejectRequest(errorMessage: string) {
        this.outputPort.Error = errorMessage;
    }

}