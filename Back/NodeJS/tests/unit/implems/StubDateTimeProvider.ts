import { IDateTimeProvider } from "../../../src/domain/IDateTimeProvider";

export class StubDateTimeProvider implements IDateTimeProvider {
    constructor(private readonly date: Date){}
    GetDate(): Date {
        return this.date;
    }
}