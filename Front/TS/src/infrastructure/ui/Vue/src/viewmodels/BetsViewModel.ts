import { Subject } from "rxjs";
import { BetsController } from "../../../../adapters/controllers/BetsController";
import { type AnswerResponse } from "../../../../../domain/features/AnswerBetHandler";
import { type AnswerBetPresenter, Key } from "../../../../adapters/presenters/AnswerBetPresenter";
import type { IDateTimeProvider } from "../../../../../domain/abstractions/IDateTimeProvider";
import type { IUserContext } from "../../../../../domain/abstractions/IUserContext";
import type { BetSummary } from "../../../../../domain/bets/BetSummary";
import type { Router } from 'vue-router';
import moment from "moment";

export class BetsViewModel {
    constructor(private readonly betController: BetsController,
                private readonly answerBetPresenter: AnswerBetPresenter,
                private readonly userContext: IUserContext,
                private readonly dateTimeProvider: IDateTimeProvider,
                private readonly router: Router
    ) {
        const answerBetSubject = new Subject<AnswerResponse>();
        answerBetSubject.subscribe(answerResponse => this.UpdateBet(answerResponse.BetId, answerResponse.Answer))
        const answerErrorBetSubject = new Subject<string>();
        answerErrorBetSubject.subscribe(() => this.ShowAnswerError("Bet is over"))
        const errorOwnBetSubject = new Subject<string>();
        errorOwnBetSubject.subscribe(() => this.ShowAnswerError("Cannot answer to your own bet"))
        const errorSameAnswerSubject = new Subject<AnswerResponse>();
        errorSameAnswerSubject.subscribe(() => this.ShowAnswerError("You have already this answer for this bet"))
        
        this.Subscribe(Key.Success.toString(), answerBetSubject)
        this.Subscribe(Key.AnswerBetError.toString(), answerErrorBetSubject)
        this.Subscribe(Key.ErrorOwnBet.toString(), errorOwnBetSubject)
        this.Subscribe(Key.ErrorSameAnswer.toString(), errorSameAnswerSubject)
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
                EndDate: moment(x.EndDate).format('L'),
                MaxAnswerDate: x.MaxAnswerDate,
                BookieId: x.BookieId,
                BookieName: x.BookieName,
                CanAnswer: this.CanAnswer(x),
                InvitedCount: x.Gamblers.length,
                AcceptedCount: x.Gamblers.filter(x => x.HasAccepted).length,
                Answer: x.Gamblers.find(y => y.Id == this.userContext.UserId)?.HasAccepted,
                CanClose: x.BookieId == this.userContext.UserId && x.IsSuccess == undefined,
                IsSuccess: x.IsSuccess,
                Result: x.IsSuccess == undefined ? undefined: this.GetResult(x.IsSuccess.valueOf(), x.BookieId)
            }
        })
    }
    private GetResult(isSuccess: boolean, bookieId: string): string {
        if(this.userContext.UserId == bookieId) {
            return isSuccess ? "Win" : "Lose"
        }

        return !isSuccess ? "Win" : "Lose"; 
    }

    private CanAnswer(betSummary: BetSummary): boolean {
        return betSummary.Gamblers.some(x => x.Id == this.userContext.UserId) &&
             betSummary.MaxAnswerDate.getTime() > this.dateTimeProvider.GetDate().getTime()
    }

    async Accept(betId: string): Promise<void>{
        const bet = this.GetBetById(betId);
        if(!bet) {
            return;
        }
        this.Error = undefined;
        await this.betController.AnswerAsync(bet.Id, 
                                            true, 
                                            bet.MaxAnswerDate, 
                                            bet.BookieId,
                                            bet.Answer)
    }

    async Decline(betId: string): Promise<void>{
        const bet = this.GetBetById(betId);
        if(!bet) {
            return;
        }
        this.Error = undefined;
        await this.betController.AnswerAsync(bet.Id, 
                                            false, 
                                            bet.MaxAnswerDate, 
                                            bet.BookieId,
                                            bet.Answer)
    }

    GetProof(betId: string): Promise<string> {
        return this.betController.GetProof(betId);
    }

    async Complete(betId: string) {
        this.router.push(`complete/${betId}`)
    }

    private GetBetById(betId: string): BetDto|undefined {
        return this.Bets.find(x => x.Id == betId);
    }
    
    private UpdateBet(betId: string, answer: boolean) {
        const bet = this.GetBetById(betId);
        if(!bet) {
            return;
        }

        if(bet.Answer != undefined) {
            if(bet.Answer === true) {
                bet.AcceptedCount--;
                bet.Answer = answer;
                return;
            }
            bet.AcceptedCount++;
            bet.Answer = answer;
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
    CanAnswer: boolean;
    CanClose: boolean;
    MaxAnswerDate: Date;
    Coins: number;
    BookieId: string;
    BookieName: string;
    AcceptedCount: number;
    InvitedCount: number;
    Answer?: boolean;
    IsSuccess?: boolean;
    Result?: string;
}