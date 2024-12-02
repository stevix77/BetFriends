import { IDateTimeProvider } from "../../domain/IDateTimeProvider";

export class Outbox {
    constructor(private id: string, private type: string, private data: string, private dateProvider: IDateTimeProvider) {}
}