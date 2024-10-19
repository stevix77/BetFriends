import { IDateTimeProvider } from "../../../src/domain/IDateTimeProvider";

export class StubDateTimeProvider implements IDateTimeProvider {
    constructor(private date: Date){}
    GetDate(): Date {
        return this.date;
    }
}