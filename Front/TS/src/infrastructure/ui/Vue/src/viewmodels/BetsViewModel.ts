import { BetsController } from "../../../../adapters/controllers/BetsController";

export class BetsViewModel {
    constructor(private readonly betController: BetsController) {}

    Bets: BetDto[] = [];

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

        await this.betController.AnswerAsync(bet.Id, true, new Date(bet.EndDate), bet.BookieId)
    }

    async Decline(betId: string): Promise<void>{
        const bet = this.GetBetById(betId);
        if(!bet) {
            return;
        }

        await this.betController.AnswerAsync(betId, false, new Date(bet.EndDate), bet.BookieId)
    }

    private GetBetById(betId: string): BetDto|undefined {
        return this.Bets.find(x => x.Id == betId);
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
}