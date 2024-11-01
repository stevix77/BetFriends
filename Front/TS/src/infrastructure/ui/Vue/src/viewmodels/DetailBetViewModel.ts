import type { Router } from "vue-router";
import type { BetsController } from "../../../../adapters/controllers/BetsController";
import type { IViewModel } from "./IViewModel";
import type { BetMember } from "../../../../../domain/bets/BetDetail";

export class DetailBetViewModel implements IViewModel {
    constructor(private betsController: BetsController,
                private router: Router) {

    }

    Chips?: number;
    Description?: string;
    EndDate?: string;
    OwnerName?: string;
    Members?: BetMember[];

    async LoadBet(id: string): Promise<void> {
        const bet = await this.betsController.RetrieveById(id);
        this.Chips = bet.Chips;
        this.Description = bet.Description;
        this.EndDate = bet.EndDate.toLocaleDateString();
        this.OwnerName = bet.OwnerName;
        this.Members = bet.Members;
    }
}