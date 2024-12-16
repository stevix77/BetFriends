import { INotification } from "../../../../../shared/application/Request/INotification";

export class BetAnsweredNotification implements INotification {
    Name: string = BetAnsweredNotification.name;

    constructor(public BetId: string, public MemberId: string, public Answer: boolean){}

}