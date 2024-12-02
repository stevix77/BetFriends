import { INotification } from "../../../application/Abstractions/Request/INotification";

export class BetAnsweredNotification implements INotification {
    Name: string = BetAnsweredNotification.name;

    constructor(public BetId: string, public MemberId: string, Answer: boolean){}

}