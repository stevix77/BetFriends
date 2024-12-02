import { INotification } from "../../../application/Abstractions/Request/INotification";

export class BetCompletedNotification implements INotification {
    Name: string = BetCompletedNotification.name;

    constructor(public BetId: string, public IsSuccessful: boolean) {}
}