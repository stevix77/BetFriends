import { DomainEventAccessor } from "../../../../../shared/infrastructure/events/DomainEventAccessor";
import { AnswerBet } from "../../../domain/answerBets/AnswerBet";
import { IAnswerBetRepository } from "../../../domain/answerBets/IAnswerBetRepository";
import { BetId } from "../../../domain/bets/BetId";
import { MemberId } from "../../../domain/members/MemberId";
import { BetContext } from "../../DataAccess/BetContext";
import { AnswerEntity } from "../../DataAccess/entities/AnswerEntity";

export class SqlAnswerRepository implements IAnswerBetRepository {

    constructor(private readonly betContext: BetContext, 
                private readonly domainEventAccessor: DomainEventAccessor
    ){}

    async GetAnswersForBet(betId: BetId): Promise<AnswerBet[]> {
        const query = await this.betContext.AnswerEntity.find({
            where: {
                BetId: betId.Value
            },
            select: {
                Answer: true,
                BetId: true,
                GamblerId: true
            }
        })
        return query.map(x => new AnswerBet(new BetId(x.BetId), x.Answer, new MemberId(x.GamblerId)))
    }
    async Save(answerBet: AnswerBet): Promise<void> {
        var entity = AnswerEntity.Create(answerBet);
        await this.betContext.AnswerEntity.save(entity);
        this.domainEventAccessor.AddEvents(answerBet.DomainEvents);
    }

}