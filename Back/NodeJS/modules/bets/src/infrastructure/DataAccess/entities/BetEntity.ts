import { Column, Entity } from "typeorm";
import { Bet } from "../../../domain/bets/Bet";

@Entity({
    schema: "bet",
    name: "bets"
})
export class BetEntity {
    
    @Column({
        name: "ownerid"
    })
    BetId: string;
    @Column({
        name: "bookie_id"
    })
    BettorId: string;
    @Column({
        name: "coins"
    })
    Coins: number;
    @Column({
        name: "description"
    })
    Description: string;
    @Column({
        name: "end_date"
    })
    EndDate: Date;
    @Column({
        name: "max_answer_date"
    })
    MaxAnswerDate: Date;
    @Column({
        name: "guests"
    })
    Guests: string;
    @Column({
        name: "is_successful"
    })
    IsSuccessful?: boolean;

    static Create(bet: Bet) : BetEntity {
        const entity = new BetEntity();
        entity.BetId = bet.BetId.Value;
        entity.BettorId = bet.BettorId.Value;
        entity.Coins = bet.Coins;
        entity.Description = bet.Description;
        entity.EndDate = bet.EndDate;
        entity.Guests = bet.Members.join(";")
        entity.MaxAnswerDate = bet.MaxAnswerDate;
        entity.IsSuccessful = bet.IsSuccessful;
        return entity;
    }

}