import { BetsController } from "../../../../adapters/controllers/BetsController";

export class BetsViewModel {
    constructor(private readonly betController: BetsController) {}

    Bets: BetDto[] = [];

    async LoadBetsAsync(): Promise<void> {
        const bets = await this.betController.RetrieveBetsAsync();
        this.Bets = bets.map(x => {
            return {
                Id: x.Id,
                Chips: x.Chips,
                Description: x.Description,
                EndDate: x.EndDate.toString()
            }
        })
    }

}

export interface BetDto {
    Id: string;
    Description: string;
    EndDate: string;
    Chips: number;
}