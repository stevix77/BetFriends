import { AnswerBet } from "../../domain/answerBets/AnswerBet";
import { IAnswerBetRepository } from "../../domain/answerBets/IAnswerBetRepository";

export class InMemoryBetAnswerRepository implements IAnswerBetRepository {
    private readonly answers: AnswerBet[] = [];
    
    constructor() {}
    Save(answerBet: AnswerBet): Promise<void> {
        const index = this.Answers.findIndex(x => x.BetId == answerBet.BetId && 
                                            x.GamberId == answerBet.GamberId
        )
        if(index != -1) {
            this.Answers.splice(index, 1)
        }
        this.answers.push(answerBet)
        return Promise.resolve();
        
    }

    public get Answers(): AnswerBet[]{
        return this.answers;
    }

}