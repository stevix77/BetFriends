import { Subject } from "rxjs";
import { BetsController } from "../../../../adapters/controllers/BetsController";
import { type AnswerResponse } from "../../../../../domain/features/AnswerBetHandler";
import { AnswerBetPresenter, Key } from "../../../../adapters/presenters/AnswerBetPresenter";

export class BetsViewModel {
    constructor(private readonly betController: BetsController,
                private readonly answerBetPresenter: AnswerBetPresenter
    ) {
        const answerBetSubject = new Subject<AnswerResponse>();
        answerBetSubject.subscribe(answerResponse => {
            this.UpdateBet(answerResponse.BetId, answerResponse.Answer);
        })

        const answerErrorBetSubject = new Subject<string>();
        answerErrorBetSubject.subscribe(error => {
            this.ShowAnswerError(error);
        })
        
        this.Subscribe(Key.Success.toString(), answerBetSubject)
        this.Subscribe(Key.AnswerBetError.toString(), answerErrorBetSubject)
    }
    
    Bets: BetDto[] = [];
    Error?: string;

    async LoadBetsAsync(): Promise<void> {
        const bets = await this.betController.RetrieveBetsAsync();
        this.Bets = bets.map(x => {
            return {
                Id: x.Id,
                Coins: x.Coins,
                Description: x.Description,
                EndDate: x.EndDate.toString(),
                BookieId: x.BookieId,
                BookieName: x.OwnerName,
                InvitedCount: x.Gamblers.length,
                AcceptedCount: x.Gamblers.filter(x => x.HasAccepted).length
            }
        })
    }

    async Accept(betId: string): Promise<void>{
        const bet = this.GetBetById(betId);
        if(!bet) {
            return;
        }
        this.Error = undefined;
        await this.betController.AnswerAsync(bet.Id, true, new Date(bet.EndDate), bet.BookieId)
    }

    async Decline(betId: string): Promise<void>{
        const bet = this.GetBetById(betId);
        if(!bet) {
            return;
        }
        this.Error = undefined;
        await this.betController.AnswerAsync(bet.Id, false, new Date(bet.EndDate), bet.BookieId)
    }

    private GetBetById(betId: string): BetDto|undefined {
        return this.Bets.find(x => x.Id == betId);
    }
    
    private UpdateBet(betId: string, answer: boolean) {
        const bet = this.GetBetById(betId);
        if(!bet) {
            return;
        }
        bet.Answer = answer;
        this.UpdateAcceptedCount(bet, answer)
    }

    private ShowAnswerError(error: string) {
        this.Error = error;
    }

    private Subscribe<T>(key: string, betsSubject: Subject<T>) {
        this.answerBetPresenter.Subscribe(key, betsSubject);
    }

    private UpdateAcceptedCount(bet: BetDto, answer: boolean) {
        if(answer) {
            bet.AcceptedCount++;
        }
    }
}

export interface BetDto {
    Id: string;
    Description: string;
    EndDate: string;
    Coins: number;
    BookieId: string;
    BookieName: string;
    AcceptedCount: number;
    InvitedCount: number;
    Answer?: boolean;
}