import { IDateTimeProvider } from "../../domain/IDateTimeProvider";

export class Outbox {
    constructor(public Id: string, public Type: string, public Data: string, dateProvider: IDateTimeProvider) {
        this.CreatedAt = dateProvider.GetDate()
    }

    CreatedAt: Date
}