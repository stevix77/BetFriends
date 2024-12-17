import { Bet } from "../../domain/bets/Bet";
import { BetId } from "../../domain/bets/BetId";
import { IBetRepository } from "../../domain/bets/IBetRepository";
import { DomainEventAccessor } from '../../../../shared/infrastructure/events/DomainEventAccessor';

export class InMemoryBetRepository implements IBetRepository {
    constructor(private domainEventsAccessor: DomainEventAccessor, public Bets: Bet[] = []){}
    GetById(betId: BetId): Promise<Bet|undefined> {
        const bet = this.Bets.find(x => x.BetId.Value == betId.Value);
        return Promise.resolve(bet);
    }

    Save(bet: Bet): Promise<void> {
        if(!this.Bets.some(b => b.BetId == bet.BetId)) {
            this.Bets.push(bet);
            this.domainEventsAccessor.AddEvents(bet.DomainEvents)
        }
        return Promise.resolve();
    }
}