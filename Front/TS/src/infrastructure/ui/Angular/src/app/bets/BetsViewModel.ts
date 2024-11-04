import { Subject } from "rxjs";
import { BetsController } from "../../../../../adapters/controllers/BetsController";
import { AnswerResponse } from "../../../../../../domain/features/AnswerBetHandler";
import { AnswerBetPresenter, Key } from "../../../../../adapters/presenters/AnswerBetPresenter";
import { IUserContext } from "../../../../../../domain/abstractions/IUserContext";

export class BetsViewModel {
    constructor(private readonly betController: BetsController,
                private readonly answerBetPresenter: AnswerBetPresenter,
                private readonly userContext: IUserContext
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
                EndDate: x.EndDate.toString(),
                BookieId: x.BookieId,
                BookieName: x.OwnerName,
                InvitedCount: x.Gamblers.length,
                AcceptedCount: x.Gamblers.filter(x => x.HasAccepted).length,
                Answer: x.Gamblers.find(y => y.Id == this.userContext.UserId)?.HasAccepted
            }
        })
    }

    async Accept(betId: string): Promise<void>{
        const bet = this.GetBetById(betId);
        if(!bet) {
            return;
        }
        this.Error = undefined;
        await this.betController.AnswerAsync(bet.Id, 
                                            true, 
                                            new Date(bet.EndDate), 
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
                                            new Date(bet.EndDate), 
                                            bet.BookieId,
                                            bet.Answer)
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
    Coins: number;
    BookieId: string;
    BookieName: string;
    AcceptedCount: number;
    InvitedCount: number;
    Answer?: boolean;
}