import { INotification } from "../../../../../shared/application/Request/INotification";

export class BetCompletedEventNotification extends INotification {
    Name: string = BetCompletedEventNotification.name;

    constructor(public readonly BetId: string, public readonly IsSuccessful: boolean){
        super();
    }
}