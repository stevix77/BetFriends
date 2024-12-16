import { INotification } from "../../../application/Abstractions/Request/INotification";

export class BetCompletedEventNotification implements INotification {
    Name: string = BetCompletedEventNotification.name;

    constructor(public readonly BetId: string, public readonly IsSuccessful: boolean){}
}