import { INotification } from "../../../../../shared/application/Request/INotification";

export class BetCompletedNotification extends INotification {
    Name: string = BetCompletedNotification.name;

    constructor(public BetId: string, public IsSuccessful: boolean) {
        super();
    }
}