import { BetsController } from "../../../../../adapters/controllers/BetsController";

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
                OwnerId: x.BookieId,
                OwnerName: x.OwnerName
            }
        })
    }

}

export interface BetDto {
    Id: string;
    Description: string;
    EndDate: string;
    Coins: number;
    OwnerId: string;
    OwnerName: string;
}