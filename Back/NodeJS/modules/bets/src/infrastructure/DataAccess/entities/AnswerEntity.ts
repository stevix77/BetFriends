import { Column, Entity } from "typeorm";
import { AnswerBet } from "../../../domain/answerBets/AnswerBet";

@Entity({
    schema: "bet",
    name: "answers"
})
export class AnswerEntity {
    static Create(answerBet: AnswerBet): AnswerEntity {
        const entity = new AnswerEntity();
        entity.Answer = answerBet.Answer;
        entity.BetId = answerBet.BetId.Value;
        entity.GamblerId = answerBet.GamblerId.Value;
        return entity;
    }

    @Column({
        name: "bet_id"
    })
    BetId: string;
    @Column({
        name: "gambler_id"
    })
    GamblerId: string;
    @Column({
        name: "answer"
    })
    Answer: boolean;
    @Column({
        name: "upserted_date"
    })
    UpsertedDate: Date;
}