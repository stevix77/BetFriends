import { IDateTimeProvider } from "../../../src/domain/abstractions/IDateTimeProvider";

export class StubDateTimeProvider implements IDateTimeProvider {
    constructor(private currentDate: Date) {}
    GetDate(): Date {
        return this.currentDate;
    }
}