import { INotification } from "../../../../../shared/application/Request/INotification"

export class BetCreatedEventNotification extends INotification {
    Name: string = BetCreatedEventNotification.name;

    constructor(public readonly BetId: string) {
        super();
    }

}