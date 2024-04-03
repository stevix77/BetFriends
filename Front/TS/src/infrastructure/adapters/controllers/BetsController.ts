import { CreateBetHandler } from '../../../domain/features/CreateBetHandler';
export class BetsController {
    constructor(private createBetHandler: CreateBetHandler) {

    }

    async Create(request: CreateBetRequest): Promise<void> {
        return this.createBetHandler.Handle({
            Chips: request.Chips,
            Description: request.Description,
            EndDate: request.EndDate,
            Friends: request.Friends
        })
    }
}

export type CreateBetRequest = {
    Chips: number;
    Description: string;
    EndDate: Date;
    Friends: string[];
}