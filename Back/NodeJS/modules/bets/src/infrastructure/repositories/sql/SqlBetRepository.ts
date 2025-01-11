import { DomainEventAccessor } from "../../../../../shared/infrastructure/events/DomainEventAccessor";
import { Bet } from "../../../domain/bets/Bet";
import { BetId } from "../../../domain/bets/BetId";
import { IBetRepository } from "../../../domain/bets/IBetRepository";
import { MemberId } from "../../../domain/members/MemberId";
import { BetContext } from "../../DataAccess/BetContext";
import { BetEntity } from "../../DataAccess/entities/BetEntity";

export class SqlBetRepository implements IBetRepository {

    constructor(private readonly betContext: BetContext, private readonly domainEventsAccessor: DomainEventAccessor){}

    async GetById(betId: BetId): Promise<Bet | undefined> {
        const betEntity = await this.betContext.BetEntity.findOneBy({
            BetId: betId.Value
        });
        if(!betEntity) {
            return undefined!
        }
        return Bet.CreateFromEntity(new BetId(betEntity.BetId),
                                    new MemberId(betEntity.BettorId),
                                    betEntity.Coins,
                                    betEntity.Description,
                                    betEntity.EndDate,
                                    betEntity.MaxAnswerDate,
                                    betEntity.Guests.split(";"),
                                    betEntity.IsSuccessful);
    }
    async Save(bet: Bet): Promise<void> {
        const entity = BetEntity.Create(bet);
        await this.betContext.BetEntity.save(entity);
        this.domainEventsAccessor.AddEvents(bet.DomainEvents)
    }

}