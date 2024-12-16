import { AnswerBet } from "../../domain/answerBets/AnswerBet";
import { IAnswerBetRepository } from "../../domain/answerBets/IAnswerBetRepository";
import { BetId } from "../../domain/bets/BetId";

export class InMemoryBetAnswerRepository implements IAnswerBetRepository {
    private readonly answers: AnswerBet[] = [];
    
    constructor(answers: AnswerBet[] = []) {
        this.answers = answers;
    }

    GetAnswersForBet(betId: BetId): Promise<AnswerBet[]> {
        const answers = this.answers.filter(x => x.BetId == betId);
        return Promise.resolve(answers);
    }

    Save(answerBet: AnswerBet): Promise<void> {
        const index = this.Answers.findIndex(x => x.BetId == answerBet.BetId && 
                                            x.GamblerId == answerBet.GamblerId
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