import { IDateTimeProvider } from "../../domain/IDateTimeProvider";

export class Outbox {
    HandledAt?: Date;
    Handled(dateProvider: IDateTimeProvider) {
        this.HandledAt = dateProvider.GetDate()
    }
    constructor(public Id: string, public Type: string, public Data: string, public CreatedAt: Date) {
        
    }
}