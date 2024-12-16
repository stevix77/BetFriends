import { expect } from "vitest";
import { CompleteBetCommand, CompleteBetCommandHandler } from "../../../src/application/features/complete-bet/CompleteBetHandler";
import { Bet } from "../../../src/domain/bets/Bet";
import { InMemoryBetRepository } from "../../../src/infrastructure/repositories/InMemoryBetRepository";
import { MockCompleteBetPresenter } from "../implems/MockCompleteBetPresenter";
import { StubUserContext } from "../implems/StubUserContext";
import { DomainEventAccessor } from "../../../../shared/infrastructure/events/DomainEventAccessor";

export class CompleteBetSut {
    WithUser(userId: string): CompleteBetSut {
        this.userId = userId
        return this;
    }
    
    constructor(){}

    private bet: Bet;
    private userId: string;
    private outputPort = new MockCompleteBetPresenter();
    
    WithBet(bet: Bet): CompleteBetSut {
        this.bet = bet;
        return this;
    }

    async WhenExecuteHandler(command: CompleteBetCommand): Promise<CompleteBetSut> {
        const betRepository = new InMemoryBetRepository(new DomainEventAccessor(), [this.bet]);
        const handler = new CompleteBetCommandHandler(betRepository, this.outputPort, new StubUserContext(this.userId));
        await handler.Handle(command);
        return this;
    }

    ShouldCompleteNotBet(errorMessage: string) {
        expect(this.outputPort.Response).toEqual(errorMessage)
    }
    ShouldCompleteBet(isSuccessful: boolean) {
        expect(this.bet.IsSuccessful).toEqual(isSuccessful)
       expect(this.outputPort.Response).toEqual({BetId: this.bet.BetId.Value, IsSuccessful: this.bet.IsSuccessful})
    }

}